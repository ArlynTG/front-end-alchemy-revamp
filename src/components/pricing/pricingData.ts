
import { PricingPlan } from "./PricingCard";

export const pricingPlans: PricingPlan[] = [
  {
    id: "early-adopter",
    name: "Early Adopter Special",
    price: 29,
    period: "mo",
    description: "Starting with a 7-day free trial",
    features: [
      "Unlimited 24/7 AI tutoring personalized to your child's learning style",
      "Parental dashboard with progress insights and weekly reports", 
      "Founder's Offer: Be one of just 200 beta subscribers to lock in our $29/month rate for life — 70% off future pricing!",
      "Free access to future enhancements and features"
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
      "Unlimited 24/7 AI tutoring personalized to your child's learning style and pace",
      "Comprehensive parental dashboard with easy-to-understand progress reports (daily, weekly & monthly)",
      "Access to \"Different Minds, Brilliant Futures\" — our research-backed weekly newsletter on breakthrough approaches for children with learning differences"
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
