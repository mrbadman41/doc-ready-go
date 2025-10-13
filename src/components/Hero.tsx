import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Hero = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery) {
      const params = new URLSearchParams();
      params.set('q', searchQuery);
      params.set('location', 'lusaka');
      navigate(`/search?${params.toString()}`);
    } else {
      navigate('/search');
    }
  };

  return (
    <section className="bg-gradient-to-b from-secondary/30 to-background py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Heading */}
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-foreground">
          Find & Book
        </h1>
        <h2 className="text-5xl md:text-6xl font-bold mb-6 text-primary">
          Healthcare in Lusaka
        </h2>
        
        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
          Check real-time availability of doctors and nurses at hospitals across Lusaka. Book appointments online and skip the waiting room.
        </p>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto flex gap-2 mb-16">
          <div className="relative flex-1">
            <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              placeholder="Search hospitals, doctors, or specialties in Lusaka..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              className="pl-12 h-14 text-base border-border bg-white shadow-sm"
            />
          </div>
          <Button 
            onClick={handleSearch}
            className="h-14 px-8 text-base font-semibold"
          >
            <Search className="mr-2 h-5 w-5" />
            Search
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;