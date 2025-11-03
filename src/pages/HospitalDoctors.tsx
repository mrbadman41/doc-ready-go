import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MapPin, Phone, Star, Calendar, Clock, ArrowLeft, Building2 } from "lucide-react";
import { BookAppointmentModal } from "@/components/BookAppointmentModal";
import { DoctorProfileModal } from "@/components/DoctorProfileModal";
import { supabase } from "@/integrations/supabase/client";

const HospitalDoctors = () => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [selectedDoctorForProfile, setSelectedDoctorForProfile] = useState<any>(null);
  const [hospital, setHospital] = useState<any>(null);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!hospitalId) return;

      // Fetch hospital
      const { data: hospitalData } = await supabase
        .from('hospitals')
        .select('*')
        .eq('id', hospitalId)
        .single();

      // Fetch doctors for this hospital
      const { data: doctorsData } = await supabase
        .from('doctors')
        .select('*, profiles!doctors_user_id_fkey(name)')
        .eq('hospital_id', hospitalId);

      setHospital(hospitalData);
      setDoctors(doctorsData || []);
      setLoading(false);
    };

    fetchData();
  }, [hospitalId]);

  const handleBookAppointment = (doctorId: string) => {
    setSelectedDoctor(doctorId);
    setIsModalOpen(true);
  };

  const handleViewProfile = (doctor: any) => {
    setSelectedDoctorForProfile(doctor);
    setIsProfileModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!hospital) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-2xl font-bold">Hospital not found</h1>
          <Button onClick={() => navigate(-1)} className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case "available":
        return "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20";
      case "busy":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20";
      case "offline":
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400 border-gray-500/20";
      default:
        return "";
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate(-1)}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>

        {/* Hospital Header */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Building2 className="h-10 w-10 text-primary" />
              </div>
              
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-3">{hospital.name}</h1>
                
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{hospital.address}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{hospital.phone}</span>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    <span className="font-medium">{hospital.rating}</span>
                    <span className="text-muted-foreground">Rating</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    <span>{hospital.beds || 0} beds</span>
                  </div>
                </div>

                {hospital.emergency_services && (
                  <Badge className="mt-4 bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20">
                    24/7 Emergency Services
                  </Badge>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Doctors List */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-6">Our Doctors ({doctors.length})</h2>
          
          {doctors.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No doctors found for this hospital</p>
          ) : (
            <div className="grid gap-6">
              {doctors.map((doctor) => (
                <Card key={doctor.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-6">
                      {/* Doctor Avatar */}
                      <Avatar className="h-20 w-20">
                        <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                          {getInitials(doctor.profiles?.name || 'Doctor')}
                        </AvatarFallback>
                      </Avatar>

                      {/* Doctor Info */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold mb-1">Dr. {doctor.profiles?.name || 'Unknown'}</h3>
                            <p className="text-muted-foreground">{doctor.specialty}</p>
                          </div>
                          
                          <Badge variant="outline" className="bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20">
                            Available
                          </Badge>
                        </div>

                        <div className="grid md:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2">
                            <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                            <span className="font-medium">{doctor.rating || 5.0}</span>
                            <span className="text-muted-foreground text-sm">Rating</span>
                          </div>
                          
                          <div className="flex items-center gap-2 text-muted-foreground text-sm">
                            <Clock className="h-4 w-4" />
                            <span>{doctor.experience || 0} years experience</span>
                          </div>

                          {doctor.consultation_fee && (
                            <div className="flex items-center gap-2 text-muted-foreground text-sm">
                              <span>Fee: ZMW {doctor.consultation_fee}</span>
                            </div>
                          )}
                        </div>

                        <div className="flex gap-3">
                          <Button onClick={() => handleBookAppointment(doctor.id)}>
                            <Calendar className="mr-2 h-4 w-4" />
                            Book Appointment
                          </Button>
                          <Button variant="outline" onClick={() => handleViewProfile(doctor)}>
                            View Profile
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>

      <BookAppointmentModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        preSelectedHospital={hospitalId}
        preSelectedDoctor={selectedDoctor || undefined}
      />

      <DoctorProfileModal
        open={isProfileModalOpen}
        onOpenChange={setIsProfileModalOpen}
        doctor={selectedDoctorForProfile}
      />
    </div>
  );
};

export default HospitalDoctors;
