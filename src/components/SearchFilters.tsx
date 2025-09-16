import { Filter, MapPin, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface SearchFiltersProps {
  selectedFilters: {
    availability: string;
    distance: string;
    rating: number;
    specialty: string[];
  };
  onFilterChange: (filters: any) => void;
}

const SearchFilters = ({ selectedFilters, onFilterChange }: SearchFiltersProps) => {
  const specialties = [
    "Cardiology", "Dermatology", "Emergency Medicine", "Family Medicine",
    "Internal Medicine", "Neurology", "Orthopedics", "Pediatrics", 
    "Psychiatry", "Radiology", "Surgery", "Urology"
  ];

  const toggleSpecialty = (specialty: string) => {
    const newSpecialties = selectedFilters.specialty.includes(specialty)
      ? selectedFilters.specialty.filter(s => s !== specialty)
      : [...selectedFilters.specialty, specialty];
    
    onFilterChange({
      ...selectedFilters,
      specialty: newSpecialties
    });
  };

  return (
    <Card className="sticky top-4">
      <CardHeader>
        <CardTitle className="flex items-center text-lg">
          <Filter className="mr-2 h-5 w-5" />
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Availability Filter */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Clock className="mr-2 h-4 w-4" />
            Availability
          </h4>
          <div className="space-y-2">
            {["Available Now", "Today", "This Week", "Any Time"].map((option) => (
              <Button
                key={option}
                variant={selectedFilters.availability === option ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => onFilterChange({
                  ...selectedFilters,
                  availability: selectedFilters.availability === option ? "" : option
                })}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Distance Filter */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <MapPin className="mr-2 h-4 w-4" />
            Distance
          </h4>
          <div className="space-y-2">
            {["Within 5 km", "Within 10 km", "Within 25 km", "Any Distance"].map((option) => (
              <Button
                key={option}
                variant={selectedFilters.distance === option ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => onFilterChange({
                  ...selectedFilters,
                  distance: selectedFilters.distance === option ? "" : option
                })}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Rating Filter */}
        <div>
          <h4 className="font-medium mb-3 flex items-center">
            <Star className="mr-2 h-4 w-4" />
            Rating
          </h4>
          <div className="space-y-2">
            {[4.5, 4.0, 3.5, 3.0].map((rating) => (
              <Button
                key={rating}
                variant={selectedFilters.rating === rating ? "default" : "outline"}
                size="sm"
                className="w-full justify-start"
                onClick={() => onFilterChange({
                  ...selectedFilters,
                  rating: selectedFilters.rating === rating ? 0 : rating
                })}
              >
                <Star className="mr-2 h-3 w-3 fill-current" />
                {rating}+ Stars
              </Button>
            ))}
          </div>
        </div>

        <Separator />

        {/* Specialty Filter */}
        <div>
          <h4 className="font-medium mb-3">Specialties</h4>
          <div className="flex flex-wrap gap-2">
            {specialties.map((specialty) => (
              <Badge
                key={specialty}
                variant={selectedFilters.specialty.includes(specialty) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/90"
                onClick={() => toggleSpecialty(specialty)}
              >
                {specialty}
              </Badge>
            ))}
          </div>
        </div>

        {/* Clear Filters */}
        <Button 
          variant="outline" 
          className="w-full"
          onClick={() => onFilterChange({
            availability: "",
            distance: "",
            rating: 0,
            specialty: []
          })}
        >
          Clear All Filters
        </Button>
      </CardContent>
    </Card>
  );
};

export default SearchFilters;