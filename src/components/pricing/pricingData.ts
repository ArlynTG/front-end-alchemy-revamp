
import { PricingPlan } from "./PricingCard";

export const pricingPlans: PricingPlan[] = [
  {
    id: "early-adopter",
    name: "Early Adopter Special",
    price: 29,
    period: "mo",
    description: "Starting with a 7-day free trial",
    features: [
      "Personalized AI tutoring for all subjects",
      "Progress tracking and insights",
      "Parent dashboard and reports",
      "Unlimited chat sessions"
    ],
    highlighted: true,
    disabled: false
  },
  {
    id: "launch",
    name: "Launch Plan",
    price: 39,
    period: "mo",
    description: "Pay monthly, cancel anytime",
    features: [
      "Everything in Early Adopter",
      "Priority support",
      "Advanced analytics",
      "Custom learning paths"
    ],
    highlighted: false,
    disabled: true
  },
  {
    id: "annual",
    name: "Annual Plan",
    price: 299,
    period: "yr",
    description: "Save $49 compared to monthly",
    features: [
      "Everything in Launch Plan",
      "2 months free",
      "Premium learning resources",
      "Exclusive webinars for parents"
    ],
    highlighted: false,
    disabled: true
  }
];
