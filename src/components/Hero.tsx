import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import heroImage from "@/assets/medical-hero.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleSearch = () => {
    if (location || specialty) {
      const params = new URLSearchParams();
      if (location) params.set('location', location);
      if (specialty) params.set('q', specialty);
      navigate(`/search?${params.toString()}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern hospital interior with medical professionals"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/50"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center text-white">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Find & Book
            <span className="block text-medical-blue-dark">Healthcare</span>
            <span className="block">Instantly</span>
          </h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Check real-time availability of doctors and nurses at nearby hospitals. 
            Book appointments before visiting physically.
          </p>
        </div>

        {/* Search Card */}
        <Card className="p-8 bg-white/95 backdrop-blur-sm shadow-2xl max-w-4xl mx-auto">
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Enter your location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Specialty or doctor name"
                value={specialty}
                onChange={(e) => setSpecialty(e.target.value)}
                className="pl-10 h-12 text-base"
              />
            </div>
            <Button 
              className="h-12 text-base font-semibold bg-primary hover:bg-primary/90 transition-all duration-300"
              onClick={handleSearch}
            >
              <Search className="mr-2 h-5 w-5" />
              Search Doctors
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-3">
              <div className="text-2xl font-bold text-primary mb-1">500+</div>
              <div className="text-sm text-muted-foreground">Hospitals</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-success mb-1">2,500+</div>
              <div className="text-sm text-muted-foreground">Doctors</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-primary mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Availability</div>
            </div>
            <div className="p-3">
              <div className="text-2xl font-bold text-success mb-1">50k+</div>
              <div className="text-sm text-muted-foreground">Appointments</div>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <Calendar className="mr-2 h-5 w-5" />
            Emergency Booking
          </Button>
          <Button variant="outline" size="lg" className="bg-white/10 border-white/30 text-white hover:bg-white/20">
            <Clock className="mr-2 h-5 w-5" />
            Find Available Now
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;