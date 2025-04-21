
// Define the interface for the PricingPlan data structure
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

// Export the type as the default export
export type { PricingPlan as default };
