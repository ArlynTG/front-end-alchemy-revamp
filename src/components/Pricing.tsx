import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PricingCard from "./pricing/PricingCard";
import { pricingPlans } from "./pricing/pricingData";

const Pricing = () => {
  const navigate = useNavigate();
  
  const handlePlanSelect = (planId: string) => {
    // Navigate to the beta registration page with the selected plan
    navigate(`/beta-registration?plan=${planId}`);
  };
  
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-medium mb-4"><strong>EXCLUSIVE ACCESS</strong></h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join our founding community of just 200 users and be the first to access beta version of Tobey's Tutor when it launches in May 2025
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
  );
};

export default Pricing;
