
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(false);
  
  const handleJoinBeta = () => {
    setIsLoading(true);
    // This will be replaced with Stripe checkout logic later
    setTimeout(() => {
      setIsLoading(false);
      alert("Stripe integration will be implemented here!");
    }, 1000);
  };

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-medium mb-4">Unlock potential. Celebrate neurodiversity. Transform Learning.</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
          Join thousands of families discovering the power of personalized AI tutoring designed specifically for neurodivergent learners.
        </p>
        
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-6 w-6 text-tobey-orange"
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-xl font-medium">7-Day Free Trial</span>
          </div>
          
          <h3 className="text-5xl font-bold my-6">$29<span className="text-xl text-gray-500 font-normal">/mo</span></h3>
          
          <p className="text-gray-600 mb-8">
            Full access to all features. Cancel anytime.
          </p>
          
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Personalized AI tutoring for all subjects</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Progress tracking and insights</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Parent dashboard and reports</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Unlimited chat sessions</span>
            </div>
          </div>
          
          <Button 
            className="w-full btn-primary text-lg py-6"
            onClick={handleJoinBeta}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Start Your Free Trial →"}
          </Button>
          
          <div className="flex justify-center items-center mt-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="100" 
              height="40" 
              viewBox="0 0 280 100" 
              className="text-gray-700"
            >
              <path 
                fill="currentColor" 
                d="M131.59 34.41c-2.45 0-4.44 1.99-4.44 4.44v21.99h8.88V38.85c0-2.45-1.99-4.44-4.44-4.44zM85.33 34.41c-2.45 0-4.44 1.99-4.44 4.44v21.99h8.88V38.85c0-2.45-1.99-4.44-4.44-4.44zM37.19 27.15c-2.45 0-4.44 1.99-4.44 4.44v29.25h8.88V31.59c0-2.45-1.99-4.44-4.44-4.44zM60.48 20.59c-2.45 0-4.44 1.99-4.44 4.44v35.81h8.88V25.03c0-2.45-1.99-4.44-4.44-4.44zM12 34.41c-2.45 0-4.44 1.99-4.44 4.44v21.99h8.88V38.85c0-2.45-1.99-4.44-4.44-4.44zM169.16 34.41c-2.45 0-4.44 1.99-4.44 4.44v21.99h8.88V38.85c0-2.45-1.99-4.44-4.44-4.44zM193.04 27.15c-2.45 0-4.44 1.99-4.44 4.44v29.25h8.88V31.59c0-2.45-1.99-4.44-4.44-4.44zM216.33 20.59c-2.45 0-4.44 1.99-4.44 4.44v35.81h8.88V25.03c0-2.45-1.99-4.44-4.44-4.44zM240.21 34.41c-2.45 0-4.44 1.99-4.44 4.44v21.99h8.88V38.85c0-2.45-1.99-4.44-4.44-4.44zM264.09 27.15c-2.45 0-4.44 1.99-4.44 4.44v29.25h8.88V31.59c0-2.45-1.99-4.44-4.44-4.44z"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

