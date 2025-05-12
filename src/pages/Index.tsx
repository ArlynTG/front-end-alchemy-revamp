
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks"; 
import Features from "@/components/Features";
import ParentDashboardPreview from "@/components/ParentDashboardPreview";
import StudentDashboardPreview from "@/components/StudentDashboardPreview";
import Story from "@/components/Story";
import FAQ from "@/components/FAQ";
import FullWidthCTA from "@/components/FullWidthCTA";
import Pricing, { PricingContext } from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

const Index = () => {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn, setUser } = useAuth();
  const [showTestTools, setShowTestTools] = useState(false);

  // This is purely for testing purposes
  const handleTestLogin = async () => {
    // Just set the logged in state without actually authenticating with Supabase
    setIsLoggedIn(true);
    setUser({ id: 'test-user-id', email: 'test@example.com' } as any);
  };

  // Log out
  const handleTestLogout = async () => {
    setIsLoggedIn(false);
    setUser(null);
  };
  
  // Get the pricing context value from the Pricing component
  // by creating a wrapper component
  const PricingWrapper = () => {
    const pricingProps = {
      openEarlyAdopterModal: () => {
        // Find the pricing section and scroll to it
        const pricingSection = document.getElementById('pricing');
        if (pricingSection) {
          pricingSection.scrollIntoView({ behavior: 'smooth' });
          
          // Small delay to ensure the section is fully scrolled into view
          setTimeout(() => {
            // Find the early adopter card and trigger its button
            const earlyAdopterCard = document.querySelector('[data-plan-id="early-adopter"]');
            if (earlyAdopterCard) {
              const button = earlyAdopterCard.querySelector('button');
              if (button) {
                button.click();
              }
            }
          }, 500);
        }
      }
    };
    
    return (
      <PricingContext.Provider value={pricingProps}>
        <Hero />
        <HowItWorks /> 
        <Features />
        <ParentDashboardPreview />
        <StudentDashboardPreview />
        <Story />
        <FAQ />
        <FullWidthCTA />
        <Pricing />
        <Contact id="contact" />
      </PricingContext.Provider>
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Testing Tools */}
      <div className="container mx-auto px-4 mt-20">
        <div className="flex justify-end">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowTestTools(!showTestTools)}
            className="text-xs"
          >
            {showTestTools ? "Hide Test Tools" : "Show Test Tools"}
          </Button>
        </div>
        
        {showTestTools && (
          <Card className="mb-8 mt-2 bg-slate-50 border border-slate-200">
            <CardContent className="p-4">
              <div className="flex flex-col gap-4">
                <div>
                  <h3 className="font-medium mb-2">Authentication Status</h3>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${isLoggedIn ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <span>{isLoggedIn ? 'Logged In' : 'Logged Out'}</span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {!isLoggedIn ? (
                    <Button size="sm" onClick={handleTestLogin}>
                      Test Login
                    </Button>
                  ) : (
                    <Button size="sm" variant="destructive" onClick={handleTestLogout}>
                      Test Logout
                    </Button>
                  )}
                  
                  <Button size="sm" onClick={() => navigate('/onboarding')}>
                    Go to Onboarding
                  </Button>
                  
                  <Button size="sm" onClick={() => navigate('/account')}>
                    Go to Account Management
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
      
      <main>
        <PricingWrapper />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
