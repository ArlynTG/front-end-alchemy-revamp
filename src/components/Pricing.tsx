
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PricingCard from "./pricing/PricingCard";
import { pricingPlans } from "./pricing/pricingData";
import BetaSignupModal from "./pricing/BetaSignupModal";

const Pricing = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlanId, setSelectedPlanId] = useState("");
  
  const handlePlanSelect = (planId: string) => {
    setSelectedPlanId(planId);
    setIsModalOpen(true);
  };
  
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-medium mb-4"><strong>Get Exclusive Access</strong></h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Join our founding community of just 200 families and access the beta version of Tobey's Tutor. Launching June 2025.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.id}
              plan={{
                id: plan.id,
                name: plan.name,
                price: `$${plan.price}`,
                description: plan.description,
                features: plan.features,
                callToAction: "Reserve Your Spot",
                popular: plan.highlighted
              }}
              onSelect={handlePlanSelect}
            />
          ))}
        </div>
      </div>
      
      <BetaSignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planId={selectedPlanId}
      />
    </section>
  );
};

export default Pricing;
