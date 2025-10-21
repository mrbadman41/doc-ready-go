import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Star, Clock, Calendar, Award } from "lucide-react";

interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  experience: number;
  availability: string;
  nextSlot?: string;
}

interface DoctorProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  doctor: Doctor | null;
}

export const DoctorProfileModal = ({ open, onOpenChange, doctor }: DoctorProfileModalProps) => {
  if (!doctor) return null;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Doctor Profile</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Doctor Header */}
          <div className="flex items-start gap-6">
            <Avatar className="h-24 w-24">
              <AvatarFallback className="text-2xl font-semibold bg-primary/10 text-primary">
                {getInitials(doctor.name)}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-2">{doctor.name}</h3>
              <p className="text-muted-foreground mb-3">{doctor.specialty}</p>
              
              <Badge 
                variant="outline" 
                className={getAvailabilityColor(doctor.availability)}
              >
                {doctor.availability.charAt(0).toUpperCase() + doctor.availability.slice(1)}
              </Badge>
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mb-2" />
              <div className="text-2xl font-bold">{doctor.rating}</div>
              <div className="text-sm text-muted-foreground">Rating</div>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Clock className="h-5 w-5 text-primary mb-2" />
              <div className="text-2xl font-bold">{doctor.experience}</div>
              <div className="text-sm text-muted-foreground">Years Exp.</div>
            </div>
            
            <div className="flex flex-col items-center p-4 bg-muted/50 rounded-lg">
              <Award className="h-5 w-5 text-primary mb-2" />
              <div className="text-2xl font-bold">12+</div>
              <div className="text-sm text-muted-foreground">Certifications</div>
            </div>
          </div>

          {/* About */}
          <div>
            <h4 className="font-semibold mb-2">About</h4>
            <p className="text-muted-foreground">
              Dr. {doctor.name.split(' ')[1]} is a highly experienced {doctor.specialty.toLowerCase()} 
              with {doctor.experience} years of clinical practice. Specialized in providing comprehensive 
              care with a patient-centered approach.
            </p>
          </div>

          {/* Education */}
          <div>
            <h4 className="font-semibold mb-2">Education & Training</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• MD - Medicine, University Medical College</li>
              <li>• Residency in {doctor.specialty}, City Hospital</li>
              <li>• Fellowship in Advanced {doctor.specialty}</li>
            </ul>
          </div>

          {/* Availability */}
          {doctor.nextSlot && (
            <div className="flex items-center gap-2 p-4 bg-primary/5 rounded-lg">
              <Calendar className="h-5 w-5 text-primary" />
              <div>
                <div className="font-semibold">Next Available Slot</div>
                <div className="text-sm text-muted-foreground">{doctor.nextSlot}</div>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
