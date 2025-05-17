
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PricingPlan } from "./PricingCard";
import { Clock } from "lucide-react";

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  return (
    <div 
      data-plan-id={plan.id}
      className={`flex flex-col justify-between p-8 rounded-xl shadow-md border ${
        plan.highlighted 
          ? 'border-tobey-orange bg-gradient-to-b from-amber-50 to-white' 
          : plan.disabled 
            ? 'border-tobey-orange bg-white/80 backdrop-blur-sm opacity-80' // Reduced blur and added opacity for a subtler effect
            : 'border-gray-200'
      }`}
    >
      <div>
        <h3 className={`text-2xl font-semibold ${
          plan.highlighted ? 'text-tobey-orange' : 
          plan.disabled ? 'text-gray-600' : ''
        }`}>{plan.name}</h3>
        <div className="mt-4 mb-6">
          <span className={`text-3xl font-bold ${plan.disabled ? 'text-gray-600' : ''}`}>${plan.price}</span>
          {plan.period && <span className="text-sm ml-1">/{plan.period}</span>}
        </div>
        <p className={`mb-6 ${plan.disabled ? 'text-gray-600' : 'text-gray-600'}`}>{plan.description}</p>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className={`h-5 w-5 min-w-5 mr-2 mt-0.5 ${plan.disabled ? 'text-gray-500' : 'text-green-500'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span className={plan.disabled ? 'text-gray-600' : ''}>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button
        onClick={() => !plan.disabled && onSelect(plan.id)}
        disabled={plan.disabled}
        className={`w-full flex items-center justify-center gap-2 transform transition-transform duration-300 hover:scale-105 ${
          plan.highlighted
            ? 'bg-tobey-orange hover:bg-tobey-orange/90 text-white'
            : plan.disabled 
              ? 'bg-white/60 text-gray-600 cursor-not-allowed border border-gray-300 hover:bg-white/60'
              : 'bg-white text-tobey-orange border border-tobey-orange hover:bg-orange-50'
        }`}
      >
        {plan.disabled ? "Coming September 2025" : (
          <>
            Reserve Your Spot for $1
            <Clock className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
};

export default PricingCard;
