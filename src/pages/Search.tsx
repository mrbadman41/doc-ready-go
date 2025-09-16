import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, MapPin, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HospitalCard from "@/components/HospitalCard";
import SearchFilters from "@/components/SearchFilters";
import { mockHospitals, Hospital } from "@/data/mockData";

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [location, setLocation] = useState(searchParams.get("location") || "");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    availability: "",
    distance: "",
    rating: 0,
    specialty: [] as string[]
  });

  useEffect(() => {
    let filteredHospitals = mockHospitals;

    // Filter by search term
    if (searchTerm) {
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.doctors.some(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Filter by availability
    if (filters.availability === "Available Now") {
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.doctors.some(doctor => doctor.availability === "available")
      );
    }

    // Filter by rating
    if (filters.rating > 0) {
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.rating >= filters.rating
      );
    }

    // Filter by specialty
    if (filters.specialty.length > 0) {
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.doctors.some(doctor =>
          filters.specialty.includes(doctor.specialty)
        )
      );
    }

    setHospitals(filteredHospitals);
  }, [searchTerm, filters]);

  return (
    <div className="min-h-screen bg-background">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex gap-4 items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Search hospitals, doctors, or specialties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative max-w-xs">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className="md:hidden"
            >
              <Filter className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className={`${
            showFilters ? 'block' : 'hidden'
          } md:block w-full md:w-80 flex-shrink-0`}>
            <SearchFilters
              selectedFilters={filters}
              onFilterChange={setFilters}
            />
          </div>

          {/* Results */}
          <div className="flex-1">
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2">
                {hospitals.length} hospitals found
                {searchTerm && ` for "${searchTerm}"`}
              </h1>
              <p className="text-muted-foreground">
                Showing available doctors and real-time availability
              </p>
            </div>

            {hospitals.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🏥</div>
                <h3 className="text-xl font-semibold mb-2">No hospitals found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search criteria or filters
                </p>
              </div>
            ) : (
              <div className="grid gap-6">
                {hospitals.map((hospital) => (
                  <HospitalCard key={hospital.id} {...hospital} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;