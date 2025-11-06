import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users, Building2, Calendar, Settings, Trash2 } from 'lucide-react';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [totalUsers, setTotalUsers] = useState(0);
  const [activeHospitals, setActiveHospitals] = useState(0);
  const [totalAppointments, setTotalAppointments] = useState(0);
  const [recentAppointments, setRecentAppointments] = useState<any[]>([]);
  const [deleteAppointmentId, setDeleteAppointmentId] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      // Fetch total users
      const { count: usersCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });
      
      // Fetch active hospitals
      const { count: hospitalsCount } = await supabase
        .from('hospitals')
        .select('*', { count: 'exact', head: true });
      
      // Fetch total appointments
      const { count: appointmentsCount } = await supabase
        .from('appointments')
        .select('*', { count: 'exact', head: true });
      
      // Fetch recent appointments
      const { data: appointments } = await supabase
        .from('appointments')
        .select(`
          *,
          profiles:patient_id (name),
          doctors (
            profiles:user_id (name),
            specialty
          ),
          hospitals (name)
        `)
        .order('created_at', { ascending: false })
        .limit(10);
      
      setTotalUsers(usersCount || 0);
      setActiveHospitals(hospitalsCount || 0);
      setTotalAppointments(appointmentsCount || 0);
      setRecentAppointments(appointments || []);
    };
    
    fetchStats();
    
    // Set up real-time subscription for appointments
    const channel = supabase
      .channel('admin-stats')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'appointments'
        },
        () => {
          fetchStats();
        }
      )
      .subscribe();
    
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleDeleteAppointment = async () => {
    if (!deleteAppointmentId) return;

    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', deleteAppointmentId);

    if (error) {
      toast.error('Failed to delete appointment');
    } else {
      toast.success('Appointment deleted successfully');
      setRecentAppointments(prev => prev.filter(a => a.id !== deleteAppointmentId));
      setTotalAppointments(prev => prev - 1);
    }
    setDeleteAppointmentId(null);
  };

  const stats = [
    { title: 'Total Users', value: totalUsers.toString(), icon: Users, color: 'text-blue-600' },
    { title: 'Active Hospitals', value: activeHospitals.toString(), icon: Building2, color: 'text-green-600' },
    { title: 'Total Appointments', value: totalAppointments.toString(), icon: Calendar, color: 'text-purple-600' },
    { title: 'System Health', value: '100%', icon: Settings, color: 'text-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">Welcome back, {user?.name}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
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

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>Manage system users and roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/users')}>
                <Users className="mr-2 h-4 w-4" />
                View All Users
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/doctors')}>
                <Users className="mr-2 h-4 w-4" />
                Manage Doctors
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/patients')}>
                <Users className="mr-2 h-4 w-4" />
                Manage Patients
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>System Configuration</CardTitle>
              <CardDescription>Configure system and appointment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/settings')}>
                <Settings className="mr-2 h-4 w-4" />
                System Settings
              </Button>
              <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/admin/appointments')}>
                <Calendar className="mr-2 h-4 w-4" />
                Appointment Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <CardDescription>Latest appointments in the system</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Hospital</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentAppointments.map((appointment) => (
                  <TableRow key={appointment.id}>
                    <TableCell>{appointment.profiles?.name || 'N/A'}</TableCell>
                    <TableCell>Dr. {appointment.doctors?.profiles?.name || 'N/A'}</TableCell>
                    <TableCell>{appointment.hospitals?.name || 'N/A'}</TableCell>
                    <TableCell>{appointment.appointment_date}</TableCell>
                    <TableCell>{appointment.appointment_time}</TableCell>
                    <TableCell>
                      <Badge variant={appointment.status === 'completed' ? 'default' : 'secondary'}>
                        {appointment.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setDeleteAppointmentId(appointment.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      <AlertDialog open={!!deleteAppointmentId} onOpenChange={() => setDeleteAppointmentId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the appointment.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteAppointment}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
