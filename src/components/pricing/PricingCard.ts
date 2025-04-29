
// Define the interface for the PricingPlan data structure
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  disabled?: boolean;
}

// Export the interface (not as default)
export type { PricingPlan };
