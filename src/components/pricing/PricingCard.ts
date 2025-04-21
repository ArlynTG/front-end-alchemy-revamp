
import { PricingCardProps } from "./PricingCard.tsx";
export type PricingPlan = {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  disabled?: boolean;
};

// Add a default export for compatibility
export default PricingCardProps;
