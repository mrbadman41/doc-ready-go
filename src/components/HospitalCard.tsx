import { MapPin, Star, Phone, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
  id,
  name, 
  address, 
  distance,
  rating, 
  phone, 
  doctors,
  image 
}: HospitalCardProps) => {
  const navigate = useNavigate();
  
  // Get unique specialties from doctors
  const specialties = [...new Set(doctors.map(d => d.specialty))];
  
  return (
    <Card className="p-6 hover:shadow-lg transition-shadow">
      <div className="flex gap-4">
        {/* Hospital Image */}
        <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-lg overflow-hidden">
          {image ? (
            <img src={image} alt={name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              🏥
            </div>
          )}
        </div>

        {/* Hospital Details */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold mb-2">{name}</h3>
          
          {/* Meta Info */}
          <div className="flex items-center gap-4 mb-2 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
              <span className="font-medium">{rating}</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{distance} from city center</span>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{doctors.length} doctors</span>
            </div>
          </div>

          {/* Address */}
          <div className="flex items-start gap-1 mb-4 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span>{address}</span>
          </div>

          {/* Specialties */}
          <div className="mb-4">
            <h4 className="text-sm font-semibold mb-2">Specialties:</h4>
            <div className="flex flex-wrap gap-2">
              {specialties.map((specialty) => (
                <Badge 
                  key={specialty} 
                  variant="secondary"
                  className="bg-muted hover:bg-muted"
                >
                  {specialty}
                </Badge>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Phone className="h-4 w-4" />
              <span>{phone}</span>
            </div>
            <Button 
              onClick={() => navigate(`/hospital/${id}/doctors`)}
              className="bg-primary hover:bg-primary/90"
            >
              View Doctors
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default HospitalCard;