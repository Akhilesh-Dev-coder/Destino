import { useState } from "react";
import { MapPin, Calendar, Compass, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TravelSearch from "@/components/TravelSearch";
import TripPlanner from "@/components/TripPlanner";
import heroImage from "@/assets/hero-travel.jpg";

const Index = () => {
  const [currentStep, setCurrentStep] = useState<"search" | "plan">("search");
  const [tripData, setTripData] = useState(null);

  const handleSearch = (data: any) => {
    setTripData(data);
    setCurrentStep("plan");
  };

  const startNewTrip = () => {
    setTripData(null);
    setCurrentStep("search");
  };

  const features = [
    {
      icon: MapPin,
      title: "Destination Search",
      description: "Find and explore amazing destinations worldwide"
    },
    {
      icon: Calendar,
      title: "Smart Planning",
      description: "Create detailed day-by-day itineraries"
    },
    {
      icon: Compass,
      title: "Transportation",
      description: "Choose your preferred mode of travel"
    },
    {
      icon: Star,
      title: "Budget Tracking",
      description: "Keep track of your expenses and stay within budget"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {currentStep === "search" ? (
        <>
          {/* Hero Section */}
          <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage: `url(${heroImage})`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-background/20 via-background/40 to-background/60"></div>
            </div>
            
            <div className="relative z-10 container mx-auto px-4 text-center">
              <div className="animate-slide-in space-y-6 mb-12">
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground">
                  Plan Your Perfect
                  <span className="block bg-gradient-hero bg-clip-text text-transparent">
                    Adventure
                  </span>
                </h1>
                <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
                  Create unforgettable journeys with our intelligent travel planner. 
                  From destinations to detailed itineraries, we've got you covered.
                </p>
              </div>
              
              <div className="animate-fade-in">
                <TravelSearch onSearch={handleSearch} />
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-20 bg-muted/30">
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-travel-blue mb-4">
                  Everything You Need to Plan
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Powerful tools to help you create the perfect travel experience
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <Card 
                    key={feature.title} 
                    className="text-center shadow-card-travel bg-gradient-card hover:shadow-travel transition-all duration-300 hover:scale-105"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <CardContent className="p-6">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gradient-accent rounded-full flex items-center justify-center">
                        <feature.icon className="w-8 h-8 text-foreground" />
                      </div>
                      <h3 className="text-xl font-semibold text-travel-blue mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {feature.description}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 bg-gradient-hero">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Start Your Journey?
              </h2>
              <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                Join thousands of travelers who trust our platform to plan their perfect trips
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="text-lg px-8 py-3"
                onClick={() => document.querySelector('.container')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Start Planning Now
              </Button>
            </div>
          </section>
        </>
      ) : (
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold text-travel-blue">Trip Planner</h1>
            <Button variant="outline" onClick={startNewTrip}>
              Plan New Trip
            </Button>
          </div>
          <TripPlanner tripData={tripData} />
        </div>
      )}
    </div>
  );
};

export default Index;