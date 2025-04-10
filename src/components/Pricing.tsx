
import { useState } from "react";
import PricingCard from "./pricing/PricingCard";
import RegistrationForm from "./pricing/RegistrationForm";
import { pricingPlans } from "./pricing/pricingData";

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState("early-adopter");
  
  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-medium mb-4"><strong>Join Our Limited Beta</strong></h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Be one of only 200 users to get early access.
          <br />
          <span className="text-base text-gray-500">Expected launch: May 2025</span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {pricingPlans.map((plan) => (
            <PricingCard 
              key={plan.id} 
              plan={plan} 
              onSelect={setSelectedPlan}
            />
          ))}
        </div>
        
        {selectedPlan && (
          <RegistrationForm selectedPlan={selectedPlan} />
        )}
      </div>
    </section>
  );
};

export default Pricing;
