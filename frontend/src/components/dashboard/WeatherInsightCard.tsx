
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Calendar, CloudRain, CloudSun, Leaf, AlertTriangle } from "lucide-react";

const WeatherInsightCard = () => {
  const [activeTab, setActiveTab] = useState("today");
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg font-semibold">Weather & Soil AI Insights</CardTitle>
          <Button variant="outline" size="sm" className="gap-1 text-xs h-8">
            <Calendar size={14} />
            <span>Calendar</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <Tabs defaultValue="today" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="today">Today</TabsTrigger>
            <TabsTrigger value="week">This Week</TabsTrigger>
            <TabsTrigger value="month">This Month</TabsTrigger>
          </TabsList>
          
          <TabsContent value="today" className="mt-0">
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="bg-earth-blue-light/20 p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-earth-blue-light rounded-full p-2">
                    <CloudSun className="h-6 w-6 text-earth-blue-dark" />
                  </div>
                  <div>
                    <p className="font-medium">Partly Cloudy</p>
                    <p className="text-sm text-muted-foreground">May 5, 2025</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">28°C</p>
                  <p className="text-sm text-muted-foreground">Feels like 30°C</p>
                </div>
              </div>
              
              <div className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-xl">65%</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Wind</p>
                    <p className="text-xl">8 km/h</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Rain Chance</p>
                    <p className="text-xl">20%</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Soil Conditions</p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-muted p-2 rounded-md flex items-center justify-between">
                      <span className="text-sm">Moisture</span>
                      <span className="font-medium">Good</span>
                    </div>
                    <div className="bg-muted p-2 rounded-md flex items-center justify-between">
                      <span className="text-sm">pH Level</span>
                      <span className="font-medium">6.5</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t pt-3 mt-3">
                  <div className="flex items-start gap-2">
                    <Leaf className="h-5 w-5 text-earth-green-DEFAULT mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">AI Recommendation</p>
                      <p className="text-sm text-muted-foreground">Great day for planting maize. Soil moisture is optimal.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="week" className="mt-0">
            <div className="rounded-lg border bg-card overflow-hidden">
              <div className="bg-earth-blue-light/20 p-4">
                <h4 className="font-medium">Weekly Forecast</h4>
                <p className="text-sm text-muted-foreground">May 5 - May 11, 2025</p>
              </div>
              
              <div className="p-4">
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-7">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, i) => (
                    <div key={day} className="flex flex-col items-center p-2 rounded-md bg-muted">
                      <span className="text-sm font-medium">{day}</span>
                      <div className="my-2">
                        {i === 2 ? (
                          <CloudRain className="h-5 w-5 text-earth-blue-DEFAULT" />
                        ) : (
                          <CloudSun className="h-5 w-5 text-earth-blue-DEFAULT" />
                        )}
                      </div>
                      <span className="text-sm">{26 + Math.floor(Math.random() * 5)}°C</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 border-t pt-3 space-y-3">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Weather Alert</p>
                      <p className="text-sm text-muted-foreground">Heavy rain expected on Wednesday. Consider protective measures for your crops.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <Leaf className="h-5 w-5 text-earth-green-DEFAULT mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Weekly Recommendation</p>
                      <p className="text-sm text-muted-foreground">Ideal week to apply organic fertilizer. Schedule irrigation for Thursday after rain.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="month" className="mt-0">
            <div className="rounded-lg border bg-card p-4 space-y-4">
              <div className="flex items-start gap-2">
                <Leaf className="h-5 w-5 text-earth-green-DEFAULT mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium">Monthly Planting Calendar</p>
                  <p className="text-sm text-muted-foreground">
                    Optimal planting periods based on your local climate and soil conditions.
                  </p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="p-2 rounded-md bg-earth-green-light/20 border border-earth-green-light">
                      <div className="flex justify-between">
                        <span className="font-medium text-earth-green-DEFAULT">Maize</span>
                        <span className="text-sm">May 5 - May 15</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full mt-2">
                        <div className="bg-earth-green-DEFAULT h-full rounded-full" style={{ width: "30%" }}></div>
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-md bg-earth-green-light/20 border border-earth-green-light">
                      <div className="flex justify-between">
                        <span className="font-medium text-earth-green-DEFAULT">Beans</span>
                        <span className="text-sm">May 10 - May 25</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full mt-2">
                        <div className="bg-earth-green-DEFAULT h-full rounded-full" style={{ width: "15%" }}></div>
                      </div>
                    </div>
                    
                    <div className="p-2 rounded-md bg-muted border">
                      <div className="flex justify-between">
                        <span className="font-medium">Tomatoes</span>
                        <span className="text-sm">June 1 - June 15</span>
                      </div>
                      <div className="w-full bg-muted h-2 rounded-full mt-2">
                        <div className="bg-gray-300 h-full rounded-full" style={{ width: "0%" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default WeatherInsightCard;
