import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import HospitalCard from "@/components/HospitalCard";
import { Search, Clock, Calendar, Users } from "lucide-react";
import { mockHospitals } from "@/data/mockData";

const PatientDashboard = () => {
  const navigate = useNavigate();
  const featuredHospitals = mockHospitals.slice(0, 3);

  const features = [
    {
      icon: Search,
      title: "Find Hospitals",
      description: "Search hospitals and clinics across Lusaka with real-time availability",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Check live doctor and nurse availability before visiting",
      color: "text-[hsl(142,76%,36%)]",
      bgColor: "bg-[hsl(142,76%,36%)]/10"
    },
    {
      icon: Calendar,
      title: "Book Appointments",
      description: "Schedule appointments online and avoid waiting queues",
      color: "text-[hsl(270,60%,60%)]",
      bgColor: "bg-[hsl(270,60%,60%)]/10"
    },
    {
      icon: Users,
      title: "Expert Doctors",
      description: "Connect with qualified healthcare professionals in Zambia",
      color: "text-[hsl(25,95%,53%)]",
      bgColor: "bg-[hsl(25,95%,53%)]/10"
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <Hero />
      
      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-8 bg-card rounded-xl border border-border hover:shadow-lg transition-all duration-300">
                <div className={`inline-flex items-center justify-center w-16 h-16 ${feature.bgColor} rounded-full mb-6`}>
                  <feature.icon className={`h-8 w-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-foreground">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Hospitals */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Featured Healthcare Providers</h2>
            <p className="text-xl text-muted-foreground">
              Top-rated hospitals with immediate availability
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {featuredHospitals.map((hospital) => (
              <HospitalCard key={hospital.id} {...hospital} doctors={hospital.doctors} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('/search')}
              className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              View All Hospitals
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;
