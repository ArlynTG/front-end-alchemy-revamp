
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Define the interface for the component props
export interface PricingCardProps {
  plan: {
    id: string;
    name: string;
    price: string;
    description: string;
    callToAction: string;
    features: string[];
    popular?: boolean;
  };
  onSelect: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  return (
    <div 
      className={`border rounded-xl p-6 flex flex-col ${
        plan.popular ? 'border-tobey-orange ring-2 ring-tobey-orange/20' : 'border-gray-200'
      }`}
    >
      {plan.popular && (
        <div className="py-1 px-3 text-xs bg-tobey-orange text-white rounded-full self-start mb-2">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-semibold mb-1">{plan.name}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{plan.price}</span>
        {plan.price !== 'Free' && <span className="text-gray-500">/mo</span>}
      </div>
      
      <p className="text-gray-600 mb-6">{plan.description}</p>
      
      <ul className="mb-8 space-y-3">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-start">
            <Check className="h-5 w-5 text-tobey-orange mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button
        className={`mt-auto w-full ${
          plan.popular ? 'bg-tobey-orange hover:bg-tobey-darkOrange' : 'bg-white text-tobey-orange border border-tobey-orange hover:bg-tobey-orange/10'
        }`}
        onClick={() => onSelect(plan.id)}
      >
        {plan.callToAction}
      </Button>
    </div>
  );
};

export default PricingCard;
