
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

// Update the interface to match the actual data structure
interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  disabled?: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  return (
    <div 
      data-plan-id={plan.id}
      className={`flex flex-col justify-between p-8 rounded-xl shadow-md border ${
        plan.highlighted ? 'border-tobey-orange bg-gradient-to-b from-amber-50 to-white' : 'border-gray-200'
      }`}
    >
      <div>
        <h3 className={`text-2xl font-semibold ${plan.highlighted ? 'text-tobey-orange' : ''}`}>{plan.name}</h3>
        <div className="mt-4 mb-6">
          <span className="text-3xl font-bold">${plan.price}</span>
          {plan.id === "early-adopter" && <span className="text-sm ml-1">one-time payment</span>}
        </div>
        <p className="text-gray-600 mb-6">{plan.description}</p>
        <ul className="space-y-3 mb-8">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg className="h-5 w-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <Button
        onClick={() => onSelect(plan.id)}
        className={`w-full ${
          plan.highlighted
            ? 'bg-tobey-orange hover:bg-tobey-orange/90 text-white'
            : 'bg-white text-tobey-orange border border-tobey-orange hover:bg-orange-50'
        }`}
      >
        Reserve Your Spot for $1
      </Button>
    </div>
  );
};

export default PricingCard;
