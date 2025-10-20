import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const EditProfile = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Initialize state with mock user data
  const [formData, setFormData] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+260 97 123 4567",
    location: "Lusaka, Zambia",
    bloodType: "O+",
    allergies: "Penicillin",
    emergencyContact: "Jane Doe - +260 96 987 6543",
    insurance: "HealthCare Plus",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would update the database
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
    
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/profile")}
            className="shrink-0"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Personal Information */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Personal Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                  className="mt-1.5"
                />
              </div>
            </div>
          </Card>

          {/* Medical Information */}
          <Card className="p-6 mb-6">
            <h2 className="text-xl font-bold mb-6">Medical Information</h2>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="bloodType">Blood Type</Label>
                <Input
                  id="bloodType"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleChange}
                  placeholder="e.g., O+"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="allergies">Allergies</Label>
                <Input
                  id="allergies"
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleChange}
                  placeholder="Enter any allergies"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="emergencyContact">Emergency Contact</Label>
                <Input
                  id="emergencyContact"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Name - Phone Number"
                  className="mt-1.5"
                />
              </div>

              <div>
                <Label htmlFor="insurance">Insurance Provider</Label>
                <Input
                  id="insurance"
                  name="insurance"
                  value={formData.insurance}
                  onChange={handleChange}
                  placeholder="Enter your insurance provider"
                  className="mt-1.5"
                />
              </div>
            </div>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/profile")}
            >
              Cancel
            </Button>
            <Button type="submit">
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
