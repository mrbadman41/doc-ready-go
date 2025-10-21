import { useState } from "react";
import { ArrowLeft, Calendar, Info } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";

const Appointments = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        {/* Empty State */}
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
