import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Edit, Building2, Award, Briefcase, Languages, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: "",
  });
  const [doctorInfo, setDoctorInfo] = useState({
    specialty: "",
    bio: "",
    experience: 0,
    phone: "",
    license_number: "",
    qualifications: "",
    languages_spoken: "",
    hospital_name: "",
    rating: 0,
    consultation_fee: 0,
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authUser) return;

      try {
        // Fetch basic profile
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (profileError) throw profileError;

        if (profileData) {
          setProfile({
            name: profileData.name || "",
            email: profileData.email || "",
            phone: profileData.phone || "",
            avatar: profileData.avatar_url || "",
          });
        }

        // Fetch doctor-specific information
        const { data: doctorData, error: doctorError } = await supabase
          .from("doctors")
          .select(`
            *,
            hospitals (name)
          `)
          .eq("user_id", authUser.id)
          .single();

        if (doctorError) throw doctorError;

        if (doctorData) {
          setDoctorInfo({
            specialty: doctorData.specialty || "",
            bio: doctorData.bio || "",
            experience: doctorData.experience || 0,
            phone: doctorData.phone || "",
            license_number: doctorData.license_number || "",
            qualifications: doctorData.qualifications || "",
            languages_spoken: doctorData.languages_spoken || "",
            hospital_name: doctorData.hospitals?.name || "",
            rating: doctorData.rating || 0,
            consultation_fee: doctorData.consultation_fee || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [authUser]);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">My Profile</h1>
          <Button variant="outline" className="gap-2" onClick={() => navigate("/doctor/profile/edit")}>
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Profile Card */}
        <Card className="p-6 mb-6">
          <div className="flex items-start gap-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar} alt={profile.name} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {profile.name ? profile.name.split(' ').map(n => n[0]).join('') : 'D'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold">Dr. {profile.name || 'Doctor'}</h2>
                <Badge variant="secondary">{doctorInfo.specialty}</Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>{profile.email || 'No email'}</span>
                </div>
                
                {doctorInfo.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>{doctorInfo.phone}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 text-purple-500" />
                  <span>{doctorInfo.hospital_name || 'No hospital assigned'}</span>
                </div>

                <div className="flex items-center gap-2 text-muted-foreground">
                  <Award className="h-4 w-4 text-orange-500" />
                  <span>{doctorInfo.experience} years of experience</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span className="font-semibold">{doctorInfo.rating.toFixed(1)} Rating</span>
                </div>
              </div>
            </div>
          </div>

          {doctorInfo.bio && (
            <div className="mt-6 pt-6 border-t">
              <h3 className="font-semibold mb-2">About</h3>
              <p className="text-muted-foreground">{doctorInfo.bio}</p>
            </div>
          )}
        </Card>

        {/* Professional Information Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Qualifications & Credentials */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Qualifications & Credentials</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Medical License Number</span>
                </div>
                <span className="font-semibold">{doctorInfo.license_number || 'Not specified'}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Award className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Qualifications</span>
                </div>
                <span className="font-semibold">{doctorInfo.qualifications || 'Not specified'}</span>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Briefcase className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Specialty</span>
                </div>
                <span className="font-semibold">{doctorInfo.specialty}</span>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Languages className="h-4 w-4 text-primary" />
                  <span className="text-sm text-muted-foreground">Languages Spoken</span>
                </div>
                <span className="font-semibold">{doctorInfo.languages_spoken || 'Not specified'}</span>
              </div>
            </div>
          </Card>

          {/* Practice Information */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Practice Information</h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground block mb-1">Hospital:</span>
                <span className="font-semibold">{doctorInfo.hospital_name || 'Not assigned'}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground block mb-1">Years of Experience:</span>
                <span className="font-semibold">{doctorInfo.experience} years</span>
              </div>
              
              {doctorInfo.consultation_fee > 0 && (
                <div>
                  <span className="text-muted-foreground block mb-1">Consultation Fee:</span>
                  <span className="font-semibold">ZMW {doctorInfo.consultation_fee.toFixed(2)}</span>
                </div>
              )}
              
              <div>
                <span className="text-muted-foreground block mb-1">Patient Rating:</span>
                <div className="flex items-center gap-2">
                  <span className="text-2xl">⭐</span>
                  <span className="font-semibold text-xl">{doctorInfo.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
