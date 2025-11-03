import { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const Appointments = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;

      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctors!appointments_doctor_id_fkey(
            specialty,
            profiles!doctors_user_id_fkey(name)
          ),
          hospitals(name, address)
        `)
        .eq('patient_id', user.id)
        .order('appointment_date', { ascending: false });

      if (!error && data) {
        setAppointments(data);
      }
      setLoading(false);
    };

    fetchAppointments();
  }, [user]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 text-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Back to Home</span>
            </button>
            <h1 className="text-3xl font-bold text-foreground">My Appointments</h1>
          </div>
          
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            Book New Appointment
          </Button>
        </div>

        {/* Appointments List */}
        {loading ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Loading appointments...</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="grid gap-4">
            {appointments.map((appt) => (
              <Card key={appt.id} className="p-6">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold text-lg">
                        Dr. {appt.doctors?.profiles?.name || 'Unknown'}
                      </h3>
                      <Badge variant={
                        appt.status === 'scheduled' ? 'default' : 
                        appt.status === 'completed' ? 'secondary' : 
                        'destructive'
                      }>
                        {appt.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{appt.doctors?.specialty}</p>
                    <p className="text-sm">{appt.hospitals?.name}</p>
                    <p className="text-sm text-muted-foreground">{appt.hospitals?.address}</p>
                    <div className="flex gap-4 mt-2">
                      <span className="text-sm font-medium">📅 {appt.appointment_date}</span>
                      <span className="text-sm font-medium">🕒 {appt.appointment_time}</span>
                    </div>
                    {appt.notes && (
                      <p className="text-sm text-muted-foreground mt-2">Note: {appt.notes}</p>
                    )}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigate(`/appointment/${appt.id}`)}
                  >
                    View Details
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mb-6">
              <Calendar className="h-16 w-16 text-muted-foreground" />
            </div>
            
            <h2 className="text-2xl font-semibold text-foreground mb-3">
              No appointments yet
            </h2>
            
            <p className="text-muted-foreground mb-8 text-center max-w-md">
              Book your first appointment to get started with HealthConnect.
            </p>
            
            <Button 
              onClick={() => setIsModalOpen(true)}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Find Hospitals
            </Button>
          </div>
        )}

        <BookAppointmentModal open={isModalOpen} onOpenChange={setIsModalOpen} />

        {/* Information Box */}
        <div className="mt-20 border border-primary/30 bg-primary/5 rounded-lg p-6">
          <div className="flex gap-4">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center">
                <Info className="h-4 w-4 text-primary" />
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-primary mb-2">Important Information</h3>
              <p className="text-sm text-foreground">
                Please arrive 15 minutes before your scheduled appointment time. Bring a valid ID and your insurance card if applicable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
