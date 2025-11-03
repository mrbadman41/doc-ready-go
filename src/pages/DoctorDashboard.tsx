import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState<any[]>([]);
  const [stats, setStats] = useState({
    todayAppointments: 0,
    totalPatients: 0,
    pendingReviews: 0,
  });

  useEffect(() => {
    const fetchDoctorData = async () => {
      if (!user?.id) return;

      // Get doctor record
      const { data: doctorData } = await supabase
        .from('doctors')
        .select('id')
        .eq('user_id', user.id)
        .single();

      if (!doctorData) return;

      // Get today's appointments
      const today = new Date().toISOString().split('T')[0];
      const { data: todayAppts } = await supabase
        .from('appointments')
        .select('*, profiles!appointments_patient_id_fkey(name)')
        .eq('doctor_id', doctorData.id)
        .eq('appointment_date', today)
        .order('appointment_time');

      // Get total unique patients
      const { count: patientCount } = await supabase
        .from('appointments')
        .select('patient_id', { count: 'exact', head: true })
        .eq('doctor_id', doctorData.id);

      // Get pending appointments
      const { count: pendingCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true })
        .eq('doctor_id', doctorData.id)
        .eq('status', 'scheduled');

      setAppointments(todayAppts || []);
      setStats({
        todayAppointments: todayAppts?.length || 0,
        totalPatients: patientCount || 0,
        pendingReviews: pendingCount || 0,
      });
    };

    fetchDoctorData();
  }, [user]);

  const statsDisplay = [
    { title: 'Today\'s Appointments', value: stats.todayAppointments.toString(), icon: Calendar, color: 'text-blue-600' },
    { title: 'Total Patients', value: stats.totalPatients.toString(), icon: Users, color: 'text-green-600' },
    { title: 'Pending Reviews', value: stats.pendingReviews.toString(), icon: Clock, color: 'text-orange-600' },
    { title: 'Consultations', value: stats.todayAppointments.toString(), icon: Activity, color: 'text-purple-600' },
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
                {appointments.length > 0 ? (
                  appointments.slice(0, 3).map((appt) => (
                    <div key={appt.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <p className="font-medium">{appt.profiles?.name || 'Patient'}</p>
                        <p className="text-sm text-muted-foreground">
                          {appt.appointment_time}
                        </p>
                      </div>
                      <Button size="sm" onClick={() => navigate(`/doctor/appointment/${appt.id}`)}>View Details</Button>
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
