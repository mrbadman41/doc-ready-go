import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/context/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(['patient', 'doctor', 'admin']),
});

const doctorSignupSchema = signupSchema.extend({
  specialty: z.string().min(2, "Specialty is required"),
  bio: z.string().optional(),
  consultation_fee: z.string().min(1, "Consultation fee is required"),
  experience: z.string().min(1, "Experience is required"),
  hospital_id: z.string().min(1, "Please select a hospital"),
});

const Login = () => {
  const navigate = useNavigate();
  const { login, signup, user, loading } = useAuth();
  
  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  
  // Signup state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupRole, setSignupRole] = useState<UserRole>("patient");
  
  // Doctor-specific fields
  const [specialty, setSpecialty] = useState("");
  const [bio, setBio] = useState("");
  const [consultationFee, setConsultationFee] = useState("");
  const [experience, setExperience] = useState("");
  const [hospitalId, setHospitalId] = useState("");
  const [hospitals, setHospitals] = useState<any[]>([]);
  
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchHospitals = async () => {
      const { data } = await supabase.from('hospitals').select('id, name').order('name');
      setHospitals(data || []);
    };
    fetchHospitals();
  }, []);

  // Redirect if already logged in
  if (!loading && user) {
    switch (user.role) {
      case "doctor":
        navigate("/doctor/dashboard");
        break;
      case "admin":
        navigate("/admin/dashboard");
        break;
      default:
        navigate("/");
    }
    return null;
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      loginSchema.parse({ email: loginEmail, password: loginPassword });
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setIsLoading(true);
    const { error } = await login(loginEmail, loginPassword);
    setIsLoading(false);
    
    if (error) {
      toast.error(error);
    } else {
      toast.success("Welcome back!");
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (signupRole === 'doctor') {
        doctorSignupSchema.parse({ 
          name: signupName, 
          email: signupEmail, 
          password: signupPassword, 
          role: signupRole,
          specialty,
          bio,
          consultation_fee: consultationFee,
          experience,
          hospital_id: hospitalId
        });
      } else {
        signupSchema.parse({ 
          name: signupName, 
          email: signupEmail, 
          password: signupPassword, 
          role: signupRole 
        });
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
        return;
      }
    }

    setIsLoading(true);
    const doctorData = signupRole === 'doctor' ? {
      specialty,
      bio,
      consultation_fee: parseFloat(consultationFee),
      experience: parseInt(experience),
      hospital_id: hospitalId
    } : undefined;
    
    const { error } = await signup(signupEmail, signupPassword, signupName, signupRole, doctorData);
    setIsLoading(false);
    
    if (error) {
      toast.error(error);
    } else {
      toast.success("Account created successfully! You can now log in.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">D+</span>
            </div>
          </div>
          <CardTitle className="text-2xl text-center">Healthcare Portal</CardTitle>
          <CardDescription className="text-center">
            Sign in or create an account to continue
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="login-email">Email</Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="name@example.com"
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="login-password">Password</Label>
                  <Input
                    id="login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </form>
            </TabsContent>
            
            <TabsContent value="signup">
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Full Name</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="name@example.com"
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="At least 6 characters"
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label>Account Type</Label>
                  <RadioGroup value={signupRole} onValueChange={(value) => setSignupRole(value as UserRole)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="patient" id="signup-patient" />
                      <Label htmlFor="signup-patient" className="font-normal cursor-pointer">
                        Patient - Book appointments and manage health records
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="doctor" id="signup-doctor" />
                      <Label htmlFor="signup-doctor" className="font-normal cursor-pointer">
                        Doctor - Manage appointments and patient care
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admin" id="signup-admin" />
                      <Label htmlFor="signup-admin" className="font-normal cursor-pointer">
                        Admin - System administration and oversight
                      </Label>
                    </div>
                  </RadioGroup>
                </div>
                
                {signupRole === 'doctor' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="specialty">Specialty</Label>
                      <Input
                        id="specialty"
                        type="text"
                        placeholder="e.g., Cardiology"
                        value={specialty}
                        onChange={(e) => setSpecialty(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="hospital">Hospital</Label>
                      <Select value={hospitalId} onValueChange={setHospitalId} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a hospital" />
                        </SelectTrigger>
                        <SelectContent>
                          {hospitals.map((hospital) => (
                            <SelectItem key={hospital.id} value={hospital.id}>
                              {hospital.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="experience">Years of Experience</Label>
                      <Input
                        id="experience"
                        type="number"
                        min="0"
                        placeholder="5"
                        value={experience}
                        onChange={(e) => setExperience(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="consultation_fee">Consultation Fee (ZMW)</Label>
                      <Input
                        id="consultation_fee"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="200.00"
                        value={consultationFee}
                        onChange={(e) => setConsultationFee(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio (Optional)</Label>
                      <Textarea
                        id="bio"
                        placeholder="Brief description about yourself..."
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </>
                )}
                
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
