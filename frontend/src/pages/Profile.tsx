import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { Loader2, User, Phone, Mail, Map, Calendar, LogOut } from "lucide-react";
import supabase from '../config/supabase';

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const navigate = useNavigate();

  const goTo = () => {
    navigate('/')
  }

  useEffect(() => {
    // Check authentication status
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error("Please sign in to view your profile");
        navigate("/");
        return;
      }

      setUser(session.user);
      
      // Fetch additional user details from user_table
      try {
        const { data: userData, error: userError } = await supabase
          .from('user_table')
          .select('*')
          .eq('user_email', session.user.email)
          .single();
        
        if (userError) throw userError;
        else {
            setProfileData(userData)
        }

        // // Get role-specific details (farmer or buyer)
        // if (userData.user_role === 'farmer') {
        //   const { data: farmerData, error: farmerError } = await supabase
        //     .from('farmers')
        //     .select('*')
        //     .eq('farmer_id', session.user.id)
        //     .single();
          
        //   if (farmerError) throw farmerError;
        //   setProfileData({ ...userData, roleData: farmerData, role: 'farmer' });
        // } else if (userData.user_role === 'buyer') {
        //   const { data: buyerData, error: buyerError } = await supabase
        //     .from('buyers')
        //     .select('*')
        //     .eq('buyer_id', session.user.id)
        //     .single();
          
        //   if (buyerError) throw buyerError;
        //   setProfileData({ ...userData, roleData: buyerData, role: 'buyer' });
        // } else {
        //   setProfileData(userData);
        // }
        
        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching profile data:', error.message);
        toast.error("Failed to load profile data");
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Failed to log out");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-green-50">
        <Loader2 className="h-8 w-8 text-green-600 animate-spin" />
        <p className="mt-4 text-green-800">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <Card className="border border-green-100 shadow-lg">
          <CardHeader className="bg-white border-b border-green-100">
            <div className="flex items-center justify-between">
              <CardTitle className="text-2xl font-semibold text-green-800">Your Profile</CardTitle>
              <Button 
                variant="outline" 
                className="text-red-500 border-red-200 hover:bg-red-50"
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" /> Sign Out
              </Button>
              <Button 
                variant="outline" 
                className="text-green-500 border-green-200 hover:bg-green-50"
                onClick={goTo}
              >
                <LogOut className="mr-2 h-4 w-4" /> Home
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex flex-col items-center">
                <Avatar className="h-24 w-24 border-2 border-green-200">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-green-100 text-green-800 text-xl">
                    {profileData?.user_name?.substring(0, 2)?.toUpperCase() || 'UN'}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-3 text-center">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 capitalize">
                    {profileData?.user_role || 'User'}
                  </span>
                </div>
              </div>
              
              <div className="flex-1 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-800">{profileData?.user_name || 'User'}</h3>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </div>
                
                <Separator className="my-4" />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Name</p>
                      <p className="font-medium">{profileData?.user_name || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Contact</p>
                      <p className="font-medium">{profileData?.user_contact || 'Not provided'}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Mail className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">{user?.email}</p>
                    </div>
                  </div>
                  
                  {profileData?.role === 'farmer' && (
                    <>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Joined</p>
                          <p className="font-medium">
                            {new Date(profileData?.roleData?.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                  
                  {profileData?.role === 'buyer' && (
                    <>
                      <div className="flex items-center gap-2">
                        <Map className="h-5 w-5 text-green-600" />
                        <div>
                          <p className="text-sm text-gray-500">Location</p>
                          <p className="font-medium">
                            {profileData?.roleData?.["buyer location"] || 'Not provided'}
                          </p>
                        </div>
                      </div>
                      
                      <div className="col-span-2 mt-2">
                        <p className="text-sm text-gray-500">Description</p>
                        <p className="font-medium">
                          {profileData?.roleData?.["buyer description"] || 'No description provided'}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Profile;