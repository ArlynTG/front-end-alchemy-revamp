
import React from 'react';
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import type { PricingPlan } from "./PricingCard.ts";

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, onSelect }) => {
  const isHighlighted = plan.highlighted;
  const isDisabled = plan.disabled;
  
  return (
    <div 
      className={`feature-highlight bg-gradient-to-br from-white to-tobey-peach/60 p-6 rounded-xl shadow-sm relative overflow-hidden backdrop-blur-sm ${
        isHighlighted ? 'ring-2 ring-tobey-orange/20' : ''
      } ${
        isDisabled ? 'opacity-60' : ''
      }`}
    >
      <div className="relative z-10 flex flex-col h-full">
        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-1 text-left">{plan.name}</h3>
          <div className="mb-4 text-left">
            <span className="text-3xl font-bold">${plan.price}</span>
            {plan.period && <span className="text-gray-500">/{plan.period}</span>}
          </div>
          
          <p className="text-gray-600 mb-6 text-left">{plan.description}</p>
          
          <ul className="mb-8 space-y-3 text-left">
            {plan.features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-tobey-orange mt-0.5 mr-2 flex-shrink-0" />
                <span className={`text-gray-600 ${isDisabled ? 'opacity-60' : ''}`}>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <Button
          className={`mt-auto w-full ${
            isHighlighted ? 'bg-tobey-orange hover:bg-tobey-orange/90' : 'bg-white text-tobey-orange border border-tobey-orange hover:bg-tobey-orange/10'
          } ${
            isDisabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : ''
          }`}
          onClick={() => onSelect(plan.id)}
          disabled={isDisabled}
        >
          {isDisabled ? "Coming Soon" : "Reserve Your Spot"}
        </Button>
      </div>
      <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-tobey-peach rounded-full opacity-40 blur-md"></div>
    </div>
  );
};

export default PricingCard;
