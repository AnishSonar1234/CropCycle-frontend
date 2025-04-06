import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import UserTypeSelector from './UserTypeSelector';
import supabase from "../config/supabase.js"

const AuthForm = () => {
  const { toast } = useToast();
  const [authMode, setAuthMode] = useState<"signin" | "signup">("signin");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [userType, setUserType] = useState<"farmer" | "buyer">("farmer");

  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!email || !password) {
      toast({
        title: "Error",
        description: "Please fill all required fields",
        variant: "destructive",
      });
      return;
    }

    if (authMode === "signup") {
      if (!name || !contactNo) {
        toast({
          title: "Error",
          description: "Please provide your name and contact number",
          variant: "destructive",
        });
        return;
      }
    }

    setIsSubmitting(true);

    try {
      // This is where you would normally integrate with an auth service
      let result;
      if (authMode === 'signup') {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
        });

        if (error) {
          toast({
            title: "Error",
            description: "An unexpected error occurred. Please try again.",
            variant: "destructive",
          });
        } else {
          const { error: profileError } = await supabase.from('user_table').insert({
            user_name: name,
            user_contact: contactNo,
            user_email: email,
            user_role: userType
          });
          if (profileError) {
            console.log(error)
          }
          else {
            toast({
              title: "Account created!",
              description: `Your account has been created as a ${userType}`,
            });
            navigate('/')
          }
        }
      } else {
        result = await supabase.auth.signInWithPassword({ email, password });
      }

      const { error } = result;
      if (error) {
        console.log(error)
      }
      else {
        toast({
          title: authMode === "signin" ? "Welcome back!" : "Account created!",
          description: authMode === "signin"
            ? "You have successfully signed in"
            : `Your account has been created as a ${userType}`,
        });
        navigate('/')
      }

      // Reset form after successful signup
      if (authMode === "signup") {
        setName("");
        setContactNo("");
        setEmail("");
        setPassword("");
      }

    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <Tabs defaultValue="signin" value={authMode} onValueChange={(v) => setAuthMode(v as "signin" | "signup")}>
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="signin">Sign In</TabsTrigger>
          <TabsTrigger value="signup">Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="signin">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <a
                  href="#"
                  className="text-sm text-green-600 hover:text-green-800"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Password Reset",
                      description: "Password reset functionality would be implemented here",
                    });
                  }}
                >
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </TabsContent>

        <TabsContent value="signup">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-name">Full Name</Label>
              <Input
                id="signup-name"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-email">Email</Label>
              <Input
                id="signup-email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-contact">Contact Number</Label>
              <Input
                id="signup-contact"
                type="tel"
                placeholder="123-456-7890"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>I am a</Label>
              <UserTypeSelector selectedType={userType} onChange={setUserType} />
            </div>

            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Creating Account..." : "Create Account"}
            </Button>
          </form>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AuthForm;