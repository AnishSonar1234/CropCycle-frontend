
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, MapPin, Clock, Calendar, Send, CornerDownRight, Check, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample data for request statuses
const REQUEST_STATUS = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  COMPLETED: "completed",
  DECLINED: "declined",
};

// Sample data for existing requests (requests from buyers to farmers)
const initialRequests = [
  {
    id: 1,
    crop: "Organic Maize",
    quantity: "500 kg",
    deadline: "Jun 15, 2025",
    budget: "₹2,200/kg",
    location: "Karnataka",
    description: "Looking for certified organic maize for food processing.",
    status: REQUEST_STATUS.PENDING,
    created: "May 1, 2025",
    responses: 2,
    buyerName: "Green Foods Inc."
  },
  {
    id: 2,
    crop: "Premium Rice",
    quantity: "1000 kg",
    deadline: "Jun 30, 2025",
    budget: "₹3,500/kg",
    location: "Tamil Nadu",
    description: "Need high-quality rice for export market. Must meet international standards.",
    status: REQUEST_STATUS.PENDING,
    created: "May 3, 2025",
    responses: 0,
    buyerName: "ExportMart Ltd."
  },
  {
    id: 3,
    crop: "Wheat",
    quantity: "800 kg",
    deadline: "May 20, 2025",
    budget: "₹2,800/kg",
    location: "Punjab",
    description: "Seeking high-protein wheat for artisanal bread making.",
    status: REQUEST_STATUS.ACCEPTED,
    created: "Apr 25, 2025",
    responses: 3,
    buyerName: "Bakery Connect"
  },
  {
    id: 4,
    crop: "Soybeans",
    quantity: "600 kg",
    deadline: "Jun 5, 2025",
    budget: "₹4,100/kg",
    location: "Gujarat",
    description: "Organic soybeans required for plant-based protein production.",
    status: REQUEST_STATUS.COMPLETED,
    created: "Apr 10, 2025",
    responses: 4,
    buyerName: "VeggiePro Foods"
  }
];

const RequestCard = ({ request }) => {
  const { toast } = useToast();
  const [showResponses, setShowResponses] = useState(false);
  
  const getStatusColor = (status) => {
    switch (status) {
      case REQUEST_STATUS.PENDING: return "bg-yellow-100 text-yellow-800";
      case REQUEST_STATUS.ACCEPTED: return "bg-green-100 text-green-800";
      case REQUEST_STATUS.COMPLETED: return "bg-blue-100 text-blue-800";
      case REQUEST_STATUS.DECLINED: return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };
  
  const getStatusLabel = (status) => {
    switch (status) {
      case REQUEST_STATUS.PENDING: return "Open";
      case REQUEST_STATUS.ACCEPTED: return "Accepted";
      case REQUEST_STATUS.COMPLETED: return "Completed";
      case REQUEST_STATUS.DECLINED: return "Declined";
      default: return "Unknown";
    }
  };
  
  return (
    <Card className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-medium text-lg">{request.crop}</h3>
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <MapPin className="h-3 w-3" />
              <span>{request.location}</span>
              <span className="mx-1">•</span>
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-0.5" />
                <span>Posted {request.created}</span>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Buyer: <span className="font-medium">{request.buyerName}</span>
            </div>
          </div>
          <Badge className={getStatusColor(request.status)}>
            {getStatusLabel(request.status)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 space-y-2">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Quantity</div>
          <div className="font-medium">{request.quantity}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Budget</div>
          <div className="font-medium">{request.budget}</div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">Deadline</div>
          <div className="flex items-center text-sm">
            <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
            <span>{request.deadline}</span>
          </div>
        </div>
        <div className="text-sm mt-2">
          <p className="text-muted-foreground">{request.description}</p>
        </div>
      </CardContent>
      <CardFooter className="pt-0">
        <div className="w-full flex justify-between items-center">
          {request.status === REQUEST_STATUS.PENDING && (
            <>
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center"
                onClick={() => setShowResponses(!showResponses)}
              >
                <CornerDownRight className="h-4 w-4 mr-1" />
                <span>{request.responses} {request.responses === 1 ? 'Response' : 'Responses'}</span>
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="sm" className="flex items-center text-black bg-earth-green-DEFAULT hover:bg-earth-green-dark">
                    <Send className="h-4 w-4 mr-1" />
                    <span>Accept Offer</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Send Offer to Buyer</DialogTitle>
                    <DialogDescription>
                      Respond to the request for {request.crop} from {request.buyerName}
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="quantity" className="text-right">
                        Quantity
                      </Label>
                      <Input
                        id="quantity"
                        defaultValue={request.quantity.split(" ")[0]}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="price" className="text-right">
                        Price
                      </Label>
                      <Input
                        id="price"
                        defaultValue={request.budget.split("/")[0]}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="harvestDate" className="text-right">
                        Harvest Date
                      </Label>
                      <Input
                        id="harvestDate"
                        type="date"
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="message" className="text-right">
                        Message
                      </Label>
                      <textarea
                        id="message"
                        placeholder="Describe your offering details..."
                        className="col-span-3 min-h-[100px] border rounded p-2"
                      />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit" onClick={() => {
                      toast({
                        title: "Offer sent!",
                        description: `Your offer has been sent to ${request.buyerName}.`,
                      });
                    }}>Submit Offer</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </>
          )}
          
          {request.status === REQUEST_STATUS.ACCEPTED && (
            <div className="w-full flex justify-end">
              <Button 
                size="sm" 
                className="bg-earth-green-DEFAULT hover:bg-earth-green-dark text-white"
              >
                View Details
              </Button>
            </div>
          )}
          
          {request.status === REQUEST_STATUS.COMPLETED && (
            <div className="w-full flex justify-end">
              <Button 
                size="sm" 
                variant="outline"
              >
                View History
              </Button>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

const RequestHistory = () => {
  return (
    <Card>
      <CardHeader>
        <h3 className="text-lg font-medium">Past Requests</h3>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Crop</TableHead>
              <TableHead>Buyer</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {initialRequests
              .filter(req => req.status === REQUEST_STATUS.COMPLETED)
              .map(request => (
                <TableRow key={request.id}>
                  <TableCell>{request.created}</TableCell>
                  <TableCell>{request.crop}</TableCell>
                  <TableCell>{request.buyerName}</TableCell>
                  <TableCell>{request.quantity}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">
                      Completed
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button size="sm" variant="outline">Details</Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const Requests = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  
  // Filter ongoing requests (pending and accepted)
  const ongoingRequests = initialRequests.filter(req => 
    req.status === REQUEST_STATUS.PENDING || 
    req.status === REQUEST_STATUS.ACCEPTED
  );
  
  // Filter based on search
  const filteredRequests = ongoingRequests.filter(request =>
    request.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    request.buyerName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <Layout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Crop Requests</h1>
          <p className="text-muted-foreground mt-1">
            View and respond to buyer requests for crops
          </p>
        </div>
        
        <Tabs defaultValue="ongoing" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="ongoing">Ongoing Requests</TabsTrigger>
            <TabsTrigger value="history">Request History</TabsTrigger>
            <TabsTrigger value="my-offers">My Offers</TabsTrigger>
          </TabsList>
          
          <TabsContent value="ongoing" className="mt-0">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search requests by crop, location, or buyer..." 
                  className="pl-9" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="All Locations" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Locations</SelectItem>
                    <SelectItem value="karnataka">Karnataka</SelectItem>
                    <SelectItem value="tamilnadu">Tamil Nadu</SelectItem>
                    <SelectItem value="punjab">Punjab</SelectItem>
                    <SelectItem value="gujarat">Gujarat</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" className="flex items-center gap-1">
                  <Filter className="h-4 w-4" />
                  <span>Filters</span>
                </Button>
              </div>
            </div>
            
            {filteredRequests.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredRequests.map((request) => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            ) : (
              <div className="bg-muted/50 border rounded-lg p-8 text-center">
                <h3 className="text-lg font-medium mb-2">No matching requests found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find more buyer requests
                </p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="history" className="mt-0">
            <RequestHistory />
          </TabsContent>
          
          <TabsContent value="my-offers" className="mt-0">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-medium">Your Offers to Buyers</h3>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Crop</TableHead>
                      <TableHead>Buyer</TableHead>
                      <TableHead>Your Price</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>May 2, 2025</TableCell>
                      <TableCell>Organic Maize</TableCell>
                      <TableCell>Green Foods Inc.</TableCell>
                      <TableCell>₹2,150/kg</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className='text-black' variant="outline">Follow Up</Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Apr 26, 2025</TableCell>
                      <TableCell>Wheat</TableCell>
                      <TableCell>Bakery Connect</TableCell>
                      <TableCell>₹2,750/kg</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Accepted</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button size="sm" className='text-black' variant="outline">View Details</Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Requests;
