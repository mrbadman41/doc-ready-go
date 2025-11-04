import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Building2, Calendar, Settings } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { mockAdminStats } from '@/data/mockData';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Users', value: mockAdminStats.totalUsers.toString(), icon: Users, color: 'text-blue-600' },
    { title: 'Active Hospitals', value: mockAdminStats.activeHospitals.toString(), icon: Building2, color: 'text-green-600' },
    { title: 'Total Appointments', value: mockAdminStats.totalAppointments.toString(), icon: Calendar, color: 'text-purple-600' },
    { title: 'System Health', value: `${mockAdminStats.systemHealth}%`, icon: Settings, color: 'text-orange-600' },
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

        <div className="grid md:grid-cols-2 gap-6">
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
      </main>
    </div>
  );
};

export default AdminDashboard;
