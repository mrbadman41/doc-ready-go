import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";

const Profile = () => {
  const navigate = useNavigate();
  const { user: authUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
    bloodType: "",
    allergies: "",
    emergencyContact: "",
    insurance: "",
    avatar: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!authUser) return;

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", authUser.id)
          .single();

        if (error) throw error;

        if (data) {
          setProfile({
            name: data.name || "",
            email: data.email || "",
            phone: data.phone || "",
            location: data.location || "",
            bloodType: data.blood_type || "",
            allergies: data.allergies || "",
            emergencyContact: data.emergency_contact || "",
            insurance: data.insurance || "",
            avatar: data.avatar_url || "",
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

  const stats = {
    totalAppointments: 24,
    completed: 21,
    upcoming: 3,
    favoriteHospital: "City General",
  };

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
          <Button variant="outline" className="gap-2" onClick={() => navigate("/profile/edit")}>
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
                {profile.name ? profile.name.split(' ').map(n => n[0]).join('') : 'U'}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold">{profile.name || 'User'}</h2>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>{profile.email || 'No email'}</span>
                </div>
                
                {profile.phone && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4 text-green-500" />
                    <span>{profile.phone}</span>
                  </div>
                )}
                
                {profile.location && (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span>{profile.location}</span>
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span>Patient since {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Stats and Medical Info Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Quick Stats */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Quick Stats</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Appointments</span>
                <span className="text-2xl font-bold">{stats.totalAppointments}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Completed</span>
                <span className="text-2xl font-bold text-green-600">{stats.completed}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Upcoming</span>
                <span className="text-2xl font-bold text-blue-600">{stats.upcoming}</span>
              </div>
              
              <div className="flex items-center justify-between pt-2 border-t">
                <span className="text-muted-foreground">Favorite Hospital</span>
                <span className="font-semibold">{stats.favoriteHospital}</span>
              </div>
            </div>
          </Card>

          {/* Medical Information */}
          <Card className="p-6">
            <h3 className="text-xl font-bold mb-6">Medical Information</h3>
            
            <div className="space-y-4">
              <div>
                <span className="text-muted-foreground block mb-1">Blood Type:</span>
                <span className="font-semibold">{profile.bloodType || 'Not specified'}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground block mb-1">Allergies:</span>
                <span className="font-semibold">{profile.allergies || 'None'}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground block mb-1">Emergency Contact:</span>
                <span className="font-semibold">{profile.emergencyContact || 'Not specified'}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground block mb-1">Insurance:</span>
                <span className="font-semibold">{profile.insurance || 'Not specified'}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
