import { useNavigate } from "react-router-dom";
import Hero from "@/components/Hero";
import HospitalCard from "@/components/HospitalCard";
import { mockHospitals } from "@/data/mockData";
import { Users, Clock, Shield, Star } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const featuredHospitals = mockHospitals.slice(0, 3);

  const features = [
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Check live availability of doctors and nurses before visiting"
    },
    {
      icon: Users,
      title: "Wide Network",
      description: "Access to 500+ hospitals and 2,500+ medical professionals"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your health data is protected with enterprise-grade security"
    },
    {
      icon: Star,
      title: "Top-rated Care",
      description: "Connect with highly-rated healthcare providers in your area"
    }
  ];

  return (
    <div className="min-h-screen">
      <Hero />
      
      {/* Features Section */}
      <section className="py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose HealthConnect?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make healthcare accessible by connecting you with the right doctors at the right time
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
                  <feature.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
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
              <HospitalCard key={hospital.id} {...hospital} />
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

export default Index;
