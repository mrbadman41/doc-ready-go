import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Users, Clock, Activity } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { useNavigate } from 'react-router-dom';

const DoctorDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = [
    { title: 'Today\'s Appointments', value: '12', icon: Calendar, color: 'text-blue-600' },
    { title: 'Total Patients', value: '248', icon: Users, color: 'text-green-600' },
    { title: 'Pending Reviews', value: '5', icon: Clock, color: 'text-orange-600' },
    { title: 'Consultations', value: '8', icon: Activity, color: 'text-purple-600' },
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
              <CardTitle>Today's Schedule</CardTitle>
              <CardDescription>Your upcoming appointments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <p className="font-medium">Patient #{i}</p>
                      <p className="text-sm text-muted-foreground">
                        {i === 1 ? '09:00 AM' : i === 2 ? '10:30 AM' : '02:00 PM'}
                      </p>
                    </div>
                    <Button size="sm">View Details</Button>
                  </div>
                ))}
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
