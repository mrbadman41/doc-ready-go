import { MapPin, Clock, Star, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  availability: "available" | "busy" | "offline";
  nextSlot?: string;
}

interface HospitalCardProps {
  id: string;
  name: string;
  address: string;
  distance: string;
  rating: number;
  phone: string;
  doctors: Doctor[];
  image?: string;
}

const HospitalCard = ({ 
  name, 
  address, 
  distance,
  rating, 
  phone, 
  doctors,
  image 
}: HospitalCardProps) => {
  const availableDoctors = doctors.filter(d => d.availability === "available").length;
  
  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold text-foreground mb-2">{name}</CardTitle>
            <div className="flex items-center text-muted-foreground mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <span className="text-sm">{address}</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">{rating}</span>
              </div>
              <span className="text-sm text-muted-foreground">{distance}</span>
            </div>
          </div>
          <Badge 
            variant={availableDoctors > 0 ? "default" : "secondary"}
            className={`${
              availableDoctors > 0 
                ? "bg-success text-success-foreground" 
                : "bg-muted text-muted-foreground"
            }`}
          >
            {availableDoctors > 0 ? `${availableDoctors} Available` : "No availability"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        {/* Doctor List */}
        <div className="space-y-3 mb-6">
          {doctors.slice(0, 3).map((doctor) => (
            <div key={doctor.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
              <div>
                <div className="font-medium text-sm">{doctor.name}</div>
                <div className="text-xs text-muted-foreground">{doctor.specialty}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${
                  doctor.availability === "available" ? "bg-success" :
                  doctor.availability === "busy" ? "bg-warning" : "bg-muted-foreground"
                }`} />
                <span className="text-xs font-medium">
                  {doctor.availability === "available" ? "Available" :
                   doctor.availability === "busy" ? doctor.nextSlot || "Busy" : "Offline"}
                </span>
              </div>
            </div>
          ))}
          {doctors.length > 3 && (
            <div className="text-center text-sm text-muted-foreground">
              +{doctors.length - 3} more doctors
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <Button 
            className="flex-1" 
            disabled={availableDoctors === 0}
            variant={availableDoctors > 0 ? "default" : "secondary"}
          >
            <Clock className="mr-2 h-4 w-4" />
            Book Now
          </Button>
          <Button variant="outline" size="icon">
            <Phone className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default HospitalCard;