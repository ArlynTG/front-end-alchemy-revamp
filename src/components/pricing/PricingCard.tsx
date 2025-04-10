
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";

export interface PricingPlan {
  id: string;
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  highlighted: boolean;
  disabled: boolean;
}

interface PricingCardProps {
  plan: PricingPlan;
  onSelect: (planId: string) => void;
}

const PricingCard = ({ plan, onSelect }: PricingCardProps) => {
  return (
    <Card 
      className={`overflow-hidden 
        ${plan.highlighted ? 'ring-2 ring-tobey-orange shadow-lg' : 'shadow-md'}
        ${plan.disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      <CardHeader className={`pb-4 ${plan.highlighted ? 'bg-tobey-orange/10' : ''}`}>
        <div className="flex items-center justify-center gap-2 mb-2">
          <div className={`${plan.highlighted ? 'bg-tobey-orange/20' : 'bg-gray-100'} p-2 rounded-full`}>
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className={`h-6 w-6 ${plan.highlighted ? 'text-tobey-orange' : 'text-gray-500'}`}
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <span className="text-xl font-medium">{plan.name}</span>
        </div>
        
        <div className="flex items-baseline justify-center gap-1 my-6">
          <h3 className="text-5xl font-bold">${plan.price}</h3>
          <span className="text-xl text-gray-500 font-normal">/{plan.period}</span>
        </div>
        
        <CardDescription className="text-gray-600">
          {plan.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-6">
        <div className="space-y-4 mb-8 text-left">
          {plan.features.map((feature, index) => (
            <div key={index} className="flex items-start gap-3">
              <Check className={`h-5 w-5 ${plan.highlighted ? 'text-tobey-orange' : 'text-gray-500'} mt-0.5`} />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          className={`w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} text-lg py-6`}
          onClick={() => onSelect(plan.id)}
          disabled={plan.disabled}
        >
          {plan.highlighted ? "Reserve Your Spot →" : "Coming Soon"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PricingCard;
