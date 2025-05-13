
import { useState, createContext, useContext } from "react";
import { useNavigate } from "react-router-dom";
import PricingCard from "./pricing/PricingCard.tsx"; // Explicitly reference .tsx extension
import { pricingPlans } from "./pricing/pricingData";

// Create a context to expose the modal functionality
export interface PricingContextType {
  openEarlyAdopterModal: () => void;
}

export const PricingContext = createContext<PricingContextType | null>(null);

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (!context) {
    throw new Error("usePricing must be used within a PricingProvider");
  }
  return context;
};

const Pricing = () => {
  const navigate = useNavigate();
  
  // Function to navigate to signup page
  const handlePlanSelect = (planId: string) => {
    navigate("/signup-test");
  };
  
  // Function to open the Early Adopter signup page
  const openEarlyAdopterModal = () => {
    navigate("/signup-test");
  };
  
  const pricingValue = {
    openEarlyAdopterModal
  };
  
  return (
    <PricingContext.Provider value={pricingValue}>
      <section id="pricing" className="py-16 md:py-24">
        <div className="container max-w-6xl mx-auto text-center">
          <h3 className="text-4xl font-medium mb-4"><strong>Get Exclusive Access</strong></h3>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join our founding community of just 200 families and access the beta version of Tobey's Tutor. Launching June 2025.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {pricingPlans.map((plan) => (
              <PricingCard 
                key={plan.id}
                plan={plan}
                onSelect={handlePlanSelect}
              />
            ))}
          </div>
        </div>
      </section>
    </PricingContext.Provider>
  );
};

export default Pricing;
