import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, User } from 'lucide-react';
import { useState } from 'react';

const DoctorSchedule = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const appointments = [
    { id: 1, time: '09:00 AM', patient: 'John Smith', type: 'Check-up', status: 'confirmed' },
    { id: 2, time: '10:30 AM', patient: 'Sarah Johnson', type: 'Follow-up', status: 'confirmed' },
    { id: 3, time: '11:00 AM', patient: 'Michael Brown', type: 'Consultation', status: 'pending' },
    { id: 4, time: '02:00 PM', patient: 'Emily Davis', type: 'Check-up', status: 'confirmed' },
    { id: 5, time: '03:30 PM', patient: 'David Wilson', type: 'Follow-up', status: 'confirmed' },
    { id: 6, time: '04:30 PM', patient: 'Lisa Anderson', type: 'Consultation', status: 'pending' },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Full Schedule</h1>
          <p className="text-muted-foreground mt-2">Manage your appointments and availability</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Calendar</CardTitle>
              <CardDescription>Select a date to view appointments</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Appointments for {date?.toLocaleDateString()}</CardTitle>
              <CardDescription>Your scheduled consultations</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{appointment.time}</span>
                        </div>
                        <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'}>
                          {appointment.status}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <User className="h-4 w-4" />
                        <span>{appointment.patient}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{appointment.type}</span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">Details</Button>
                      <Button size="sm">Start</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default DoctorSchedule;
