
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface PasswordProtectionProps {
  children: React.ReactNode;
  password: string;
}

const PasswordProtection: React.FC<PasswordProtectionProps> = ({ 
  children, 
  password 
}) => {
  const [inputPassword, setInputPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  // Check if the user has already been authenticated
  useEffect(() => {
    const authenticated = localStorage.getItem("site-authenticated");
    if (authenticated === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (inputPassword === password) {
      setIsAuthenticated(true);
      localStorage.setItem("site-authenticated", "true");
    } else {
      toast({
        title: "Incorrect Password",
        description: "Please try again with the correct password.",
        variant: "destructive"
      });
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="flex items-center justify-center w-full h-screen bg-tobey-blue">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-tobey-orange">Site Under Construction</h1>
          <p className="mt-2 text-gray-600">Enter the password to view this site</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input
              type="password"
              placeholder="Enter password"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
              className="w-full"
            />
          </div>
          <Button type="submit" className="w-full bg-tobey-orange hover:bg-tobey-orange/90">
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PasswordProtection;
