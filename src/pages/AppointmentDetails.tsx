import Navigation from '@/components/Navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, User, Phone, Mail, MapPin, FileText, AlertCircle } from 'lucide-react';

const AppointmentDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock appointment data - would come from backend
  const appointment = {
    id: id || '1',
    patient: {
      name: 'John Smith',
      age: 45,
      phone: '+260 97 123 4567',
      email: 'john.smith@email.com',
      address: 'Plot 123, Cairo Road, Lusaka, Zambia',
    },
    date: 'March 15, 2024',
    time: '09:00 AM',
    duration: '30 minutes',
    type: 'Check-up',
    status: 'confirmed',
    reason: 'Regular health check-up and blood pressure monitoring',
    notes: 'Patient has been experiencing mild headaches in the past week. No other symptoms reported.',
    medicalHistory: [
      'Hypertension (controlled)',
      'Type 2 Diabetes',
      'Seasonal allergies',
    ],
    currentMedications: [
      'Lisinopril 10mg - Once daily',
      'Metformin 500mg - Twice daily',
    ],
    vitals: {
      bloodPressure: '130/85 mmHg',
      heartRate: '72 bpm',
      temperature: '98.6°F',
      weight: '180 lbs',
    },
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Appointment Details</h1>
              <p className="text-muted-foreground mt-2">Appointment ID: #{appointment.id}</p>
            </div>
            <Badge variant={appointment.status === 'confirmed' ? 'default' : 'secondary'} className="text-sm">
              {appointment.status}
            </Badge>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Patient Name</p>
                      <p className="font-medium">{appointment.patient.name}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Age</p>
                      <p className="font-medium">{appointment.patient.age} years</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Phone</p>
                      <p className="font-medium">{appointment.patient.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <p className="text-sm text-muted-foreground">Email</p>
                      <p className="font-medium">{appointment.patient.email}</p>
                    </div>
                  </div>
                </div>
                <Separator />
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="font-medium">{appointment.patient.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Notes</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Reason for Visit</p>
                  <p className="text-foreground">{appointment.reason}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Notes</p>
                  <p className="text-foreground">{appointment.notes}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Conditions</p>
                  <div className="space-y-2">
                    {appointment.medicalHistory.map((condition, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span>{condition}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground mb-3">Current Medications</p>
                  <div className="space-y-2">
                    {appointment.currentMedications.map((medication, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span>{medication}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{appointment.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-medium">{appointment.time}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Duration</p>
                    <p className="font-medium">{appointment.duration}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Type</p>
                    <p className="font-medium">{appointment.type}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Vital Signs</CardTitle>
                <CardDescription>Last recorded</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground">Blood Pressure</p>
                  <p className="font-medium">{appointment.vitals.bloodPressure}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Heart Rate</p>
                  <p className="font-medium">{appointment.vitals.heartRate}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Temperature</p>
                  <p className="font-medium">{appointment.vitals.temperature}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Weight</p>
                  <p className="font-medium">{appointment.vitals.weight}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button className="w-full" variant="default">
                  Start Consultation
                </Button>
                <Button className="w-full" variant="outline">
                  Reschedule
                </Button>
                <Button className="w-full" variant="outline">
                  Cancel Appointment
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AppointmentDetails;
