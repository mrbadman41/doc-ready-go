import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { format } from 'date-fns';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [todayCount, setTodayCount] = useState(0);
  const [totalPatients, setTotalPatients] = useState(0);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchAppointments = async () => {
      // First get the doctor record for the current user
      const { data: doctorData, error: doctorError } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user.id)
        .single();
      
      if (doctorError || !doctorData) {
        console.error('Error fetching doctor:', doctorError);
        setLoading(false);
        return;
      }
      
      // Fetch today's appointments
      const todayDate = format(new Date(), 'yyyy-MM-dd');
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles:patient_id (name),
          hospitals (name)
        `)
        .eq('doctor_id', doctorData.id)
        .eq('appointment_date', todayDate)
        .order('appointment_time');
      
      if (error) {
        console.error('Error fetching appointments:', error);
        setLoading(false);
        return;
      }
      
      setAppointments(data || []);
      setTodayCount(data?.length || 0);
      
      // Get unique patient count
      const uniquePatients = new Set(data?.map(apt => apt.patient_id) || []);
      setTotalPatients(uniquePatients.size);
      
      setLoading(false);
    };
    
    fetchAppointments();
    
    // Set up real-time subscription
    const channel = supabase
      .channel('doctor-appointments')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        () => {
          fetchAppointments();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, [user?.id]);

  const statsDisplay = [
    { title: 'Today\'s Appointments', value: todayCount.toString(), icon: Calendar, color: 'text-blue-600' },
    { title: 'Total Patients', value: totalPatients.toString(), icon: Users, color: 'text-green-600' },
    { title: 'Pending Reviews', value: '0', icon: Clock, color: 'text-orange-600' },
    { title: 'Consultations', value: todayCount.toString(), icon: Activity, color: 'text-purple-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Doctor Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, Dr. {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsDisplay.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {loading ? (
                  <p className="text-sm text-muted-foreground text-center py-4">Loading...</p>
                ) : appointments.length > 0 ? (
                  appointments.slice(0, 3).map((appt) => (
                    <div key={appt.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{appt.profiles?.name || 'Unknown Patient'}</p>
                        <p className="text-sm text-muted-foreground">
                          {appt.appointment_time}
                        </p>
                        {appt.notes && (
                          <p className="text-xs text-muted-foreground mt-1">{appt.notes}</p>
                        )}
                      </div>
                      <Button size="sm" onClick={() => toast.info("Appointment details coming soon!")}>View Details</Button>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No appointments scheduled for today</p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/doctor/schedule')}>
                <Calendar className="mr-2 h-4 w-4" />
                View Full Schedule
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/doctor/patients')}>
                <Users className="mr-2 h-4 w-4" />
                Patient Records
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/doctor/prescriptions')}>
                <Clock className="mr-2 h-4 w-4" />
                Prescription History
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorDashboard;
