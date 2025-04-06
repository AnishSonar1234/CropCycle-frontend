
import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import WeatherInsightCard from "@/components/dashboard/WeatherInsightCard";
import CarbonCreditTracker from "@/components/dashboard/CarbonCreditTracker";
import MapView from "@/components/dashboard/MapView";
import RecommendationCard from "@/components/dashboard/RecommendationCard";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [userName, setUserName] = useState("Farmer");
  
  useEffect(() => {
    // Welcome toast for demonstration
    setTimeout(() => {
      toast({
        title: "Welcome to CropCircle Connect",
        description: "Your sustainable farming companion is ready to help!",
        duration: 5000,
      });
    }, 1500);
  }, [toast]);
  
  return (
    <Layout>
      <div className="flex flex-col space-y-8">
        {/* Greeting and Overview Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Welcome, {userName}</h1>
            <p className="text-muted-foreground">
              Here's your farming dashboard for May 5, 2025
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open("https://openweathermap.org", "_blank")}
            >
              Check Full Forecast
            </Button>
            <Button 
              className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white"
              onClick={() => window.open("/practices", "_self")}
            >
              Explore Eco Practices
            </Button>
          </div>
        </div>
        
        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Weather Insights */}
          <div className="lg:col-span-2">
            <WeatherInsightCard />
          </div>
          
          {/* Right Column - Carbon Credits */}
          <div>
            <CarbonCreditTracker />
          </div>
        </div>
        
        {/* Map View Section */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Location</h2>
          <MapView />
        </div>
        
        {/* Recommendations */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecommendationCard />
          </div>
          <div className="hidden lg:block">
            {/* This could be used for additional content like recent activity or notifications */}
            <div className="h-full border rounded-lg p-6 flex items-center justify-center bg-muted/50">
              <p className="text-center text-muted-foreground">
                Coming Soon: Market Price Trends
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
