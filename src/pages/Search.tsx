import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Search, ArrowLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HospitalCard from "@/components/HospitalCard";
import { mockHospitals, Hospital } from "@/data/mockData";

const SearchPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [hospitals, setHospitals] = useState<Hospital[]>(mockHospitals);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");

  useEffect(() => {
    let filteredHospitals = mockHospitals;

    if (searchTerm) {
      filteredHospitals = filteredHospitals.filter(hospital =>
        hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        hospital.doctors.some(doctor => 
          doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setHospitals(filteredHospitals);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="ghost" 
                onClick={() => navigate('/')}
                className="gap-2"
              >
                <ArrowLeft className="h-5 w-5" />
                Back to Home
              </Button>
              <h1 className="text-2xl font-bold">Find Hospitals</h1>
            </div>
            <Button 
              variant="outline"
              onClick={() => navigate('/appointments')}
            >
              My Appointments
            </Button>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="bg-muted/30 border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search hospitals, specialties, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-12 text-base"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-xl font-bold mb-6">
          {hospitals.length} hospitals found
        </h2>

        {hospitals.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-xl font-semibold mb-2">No hospitals found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search criteria
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {hospitals.map((hospital) => (
              <HospitalCard key={hospital.id} {...hospital} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;