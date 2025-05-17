
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";

const ParentLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Set document title and metadata when component mounts
  useEffect(() => {
    document.title = "Tobey's Tutor: Parent Login | AI Learning Assistant";
    
    // Update meta tags
    const updateMetaTag = (name: string, content: string) => {
      let metaTag = document.querySelector(`meta[${name.includes(':') ? 'property' : 'name'}="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (name.includes(':')) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('description', 'AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential.');
    updateMetaTag('og:title', 'Tobey\'s Tutor: Parent Login | AI Learning Assistant');
    updateMetaTag('og:description', 'AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential.');
    updateMetaTag('og:type', 'website');

    // Cleanup function to restore original title when component unmounts
    return () => {
      document.title = 'Tobey\'s Tutor';
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulated login attempt
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: "You have been logged in successfully.",
      });
      navigate("/parent-dashboard-v3B"); // Redirect to v3B dashboard
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="container max-w-md mx-auto py-16 px-4 sm:px-0 flex-grow relative">
        {/* Overlay - removing the full-opacity overlay to make it more visible */}
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
          <div className="bg-white/90 p-6 rounded-xl shadow-lg text-center max-w-sm mx-4">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Coming Soon!</h3>
            <p className="text-gray-600">This feature will be live when we launch in June 2025</p>
            <div className="mt-4">
              <Link to="/parent-dashboard-v3B" className="inline-flex items-center justify-center text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-tobey-orange text-white hover:bg-tobey-orange/90 h-9 rounded-md px-4 py-2">
                View Dashboard Preview
              </Link>
            </div>
          </div>
        </div>

        <div className="opacity-50">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Parent Login</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to your parent account to access your dashboard
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="yourname@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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

            <div className="text-center text-sm text-gray-500">
              <Link to="/parent-dashboard-v3B" className="text-tobey-orange hover:underline">
                Demo: View Dashboard
              </Link>
            </div>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link
                to="#"
                className="text-tobey-orange hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentLogin;
