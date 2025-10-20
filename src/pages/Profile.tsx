import { useNavigate } from "react-router-dom";
import { Mail, Phone, MapPin, Calendar, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Navigation from "@/components/Navigation";

const Profile = () => {
  const navigate = useNavigate();

  // Mock user data - in a real app, this would come from authentication/database
  const user = {
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+260 97 123 4567",
    location: "Lusaka, Zambia",
    memberSince: "January 2024",
    avatar: "",
  };

  const stats = {
    totalAppointments: 24,
    completed: 21,
    upcoming: 3,
    favoriteHospital: "City General",
  };

  const medicalInfo = {
    bloodType: "O+",
    allergies: "Penicillin",
    emergencyContact: "Jane Doe - +260 96 987 6543",
    insurance: "HealthCare Plus",
  };

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
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                {user.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-3">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4 text-blue-500" />
                  <span>{user.email}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4 text-green-500" />
                  <span>{user.phone}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4 text-red-500" />
                  <span>{user.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-purple-500" />
                  <span>Patient since {user.memberSince}</span>
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
                <span className="font-semibold">{medicalInfo.bloodType}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground block mb-1">Allergies:</span>
                <span className="font-semibold">{medicalInfo.allergies}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground block mb-1">Emergency Contact:</span>
                <span className="font-semibold">{medicalInfo.emergencyContact}</span>
              </div>
              
              <div>
                <span className="text-muted-foreground block mb-1">Insurance:</span>
                <span className="font-semibold">{medicalInfo.insurance}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
