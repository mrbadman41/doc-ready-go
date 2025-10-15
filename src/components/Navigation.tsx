import { Bell, Calendar, User, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const Navigation = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };
  
  return (
    <nav className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">D+</span>
            </div>
            <span className="text-lg font-semibold text-foreground">
              Doctor Check-in & Appointments
            </span>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              className="gap-2"
              onClick={() => navigate('/appointments')}
            >
              <Calendar className="h-5 w-5" />
              <span className="hidden sm:inline">My Appointments</span>
            </Button>
            <Button 
              variant="ghost" 
              className="gap-2"
              onClick={() => navigate('/profile')}
            >
              <User className="h-5 w-5" />
              <span className="hidden sm:inline">Profile</span>
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
            </Button>
            <Button 
              variant="ghost" 
              className="gap-2"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
