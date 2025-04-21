
import { PricingPlan } from "./PricingCard";

export const pricingPlans: PricingPlan[] = [
  {
    id: "early-adopter",
    name: "Early Adopter Special",
    price: "29",
    period: "mo",
    description: "Starting with a 7-day free trial",
    features: [
      "Unlimited 24/7 AI tutoring personalized to your child's learning style",
      "Parental dashboard with progress insights and weekly reports", 
      "LIMITED OFFER: The first 200 families lock in the beta pricing of $29/month for life -- 25% off future pricing!",
      "Free access to future enhancements and features"
    ],
    highlighted: true,
    disabled: false
  },
  {
    id: "launch",
    name: "Launch Plan",
    price: "39",
    period: "mo",
    description: "Pay monthly, cancel anytime",
    features: [
      "Everything in Early Adopter Special (Except the introductory pricing)",
      "Speech-to-text interactions",
      "Access to \"Different Minds, Brilliant Futures\" — our research-backed weekly newsletter on breakthrough approaches for children with learning differences"
    ],
    highlighted: false,
    disabled: true  // This was already true, but making it explicit
  },
  {
    id: "annual",
    name: "Annual Plan",
    price: "299",
    period: "yr",
    description: "Save $49 compared to monthly",
    features: [
      "Everything in Launch Plan",
      "2 months free"
    ],
    highlighted: false,
    disabled: true  // This was already true, but making it explicit
  }
];
