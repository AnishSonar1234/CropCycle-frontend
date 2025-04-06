
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const RecommendationCard = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Sustainable Practice Recommendation</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-earth-green-light/20 rounded-lg p-3 flex flex-col">
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-earth-green-DEFAULT p-2 rounded-full">
              <Leaf className="h-5 w-5 text-white" />
            </div>
            <h3 className="font-medium text-earth-green-DEFAULT">Crop Rotation Plan</h3>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3">
            Based on your soil analysis and previous crops, we recommend the following rotation:
          </p>
          
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="bg-earth-green-light/30 text-earth-green-dark px-2 py-1 rounded-md text-xs font-medium">
              Current: Maize
            </div>
            <div className="bg-muted px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <ChevronRight className="h-3 w-3 mr-1" />
              Beans (Next Season)
            </div>
            <div className="bg-muted px-2 py-1 rounded-md text-xs font-medium flex items-center">
              <ChevronRight className="h-3 w-3 mr-1" />
              Squash (Following)
            </div>
          </div>
          
          <div className="bg-white p-2 rounded-md border mb-3">
            <h4 className="text-sm font-medium mb-1 text-black">Why This Matters</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="flex flex-col">
                <span className="text-muted-foreground">Nitrogen Fixed</span>
                <span className="font-medium text-black">+25kg/hectare</span>
              </div>
              <div className="flex flex-col">
                <span className="text-muted-foreground">Pest Reduction</span>
                <span className="font-medium text-black">-40%</span>
              </div>
            </div>
          </div>
          
          <Button variant="link" className="text-earth-green-DEFAULT p-0 justify-start text-sm">
            View detailed rotation plan
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            See more sustainable practices in the Eco Hub
          </span>
          <Button variant="outline" size="sm" onClick={() => navigate("/practices")}>
            View All
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default RecommendationCard;
