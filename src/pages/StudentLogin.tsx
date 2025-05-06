
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Helmet } from "react-helmet-async";

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulated login attempt
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Attempted",
        description: "This is a demo login. Authentication functionality will be implemented when connected to a backend.",
      });
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Tobey's Tutor: Student Login | AI Learning Assistant</title>
        <meta name="description" content="AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential." />
        <meta property="og:title" content="Tobey's Tutor: Student Login | AI Learning Assistant" />
        <meta property="og:description" content="AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Navbar />
      <div className="container max-w-md mx-auto py-16 px-4 sm:px-0 flex-grow relative">
        {/* Overlay */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center max-w-sm mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon!</h3>
            <p className="text-gray-600">This feature will be live when we launch in June 2025</p>
          </div>
        </div>

        <div className="opacity-50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Student Login</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access your learning dashboard
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label htmlFor="password" className="block text-sm font-medium">
                  Password
                </label>
                <Link
                  to="#"
                  className="text-sm text-tobey-orange hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>
            
            <Button
              type="submit"
              className="w-full btn-primary"
              disabled={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Need help? Contact your teacher or school administrator
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
