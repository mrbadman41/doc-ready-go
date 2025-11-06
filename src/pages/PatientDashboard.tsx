import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import { Search, Clock, Calendar, Users, Stethoscope } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState<any[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [bookingModalOpen, setBookingModalOpen] = useState(false);

  useEffect(() => {
    fetchHospitalsWithDoctors();
  }, []);

  const fetchHospitalsWithDoctors = async () => {
    const { data: hospitalsData } = await supabase
      .from('hospitals')
      .select(`
        *,
        doctors (
          *,
          profiles:user_id (name, avatar_url)
        )
      `)
      .order('name');

    setHospitals(hospitalsData || []);
  };

  const handleBookAppointment = (doctor: any) => {
    setSelectedDoctor(doctor);
    setBookingModalOpen(true);
  };

  const features = [
    {
      icon: Search,
      title: "Find Hospitals",
      description: "Search hospitals and clinics across Lusaka with real-time availability",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Check live doctor and nurse availability before visiting",
      color: "text-[hsl(142,76%,36%)]",
      bgColor: "bg-[hsl(142,76%,36%)]/10"
    },
    {
      icon: Calendar,
      title: "Book Appointments",
      description: "Schedule appointments online and avoid waiting queues",
      color: "text-[hsl(270,60%,60%)]",
      bgColor: "bg-[hsl(270,60%,60%)]/10"
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Connect with qualified healthcare professionals in Zambia",
      color: "text-[hsl(25,95%,53%)]",
      bgColor: "bg-[hsl(25,95%,53%)]/10"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-6`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hospitals & Doctors */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Healthcare Providers</h2>
            <p className="text-xl text-muted-foreground">
              Browse doctors by hospital and book your appointment
            </p>
          </div>
          
          <div className="space-y-8">
            {hospitals.map((hospital) => (
              <Card key={hospital.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-2xl">{hospital.name}</CardTitle>
                      <CardDescription className="mt-2">{hospital.address}</CardDescription>
                    </div>
                    <Badge variant="outline" className="ml-4">
                      {hospital.doctors?.length || 0} Doctors
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  {hospital.doctors && hospital.doctors.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {hospital.doctors.map((doctor: any) => (
                        <Card key={doctor.id} className="border-border">
                          <CardContent className="p-4">
                            <div className="flex items-start space-x-3">
                              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                                <Stethoscope className="h-6 w-6 text-primary" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm truncate">
                                  Dr. {doctor.profiles?.name || 'Unknown'}
                                </h4>
                                <p className="text-xs text-muted-foreground">{doctor.specialty}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge variant="secondary" className="text-xs">
                                    {doctor.experience}y exp
                                  </Badge>
                                  <span className="text-xs font-medium">
                                    K{doctor.consultation_fee}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button 
                              size="sm" 
                              className="w-full mt-3"
                              onClick={() => handleBookAppointment(doctor)}
                            >
                              Book Appointment
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground text-center py-8">
                      No doctors available at this hospital yet
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <BookAppointmentModal
        open={bookingModalOpen}
        onOpenChange={setBookingModalOpen}
        preSelectedDoctor={selectedDoctor?.id}
        preSelectedHospital={selectedDoctor?.hospital_id}
      />
    </div>
  );
};

export default PatientDashboard;
