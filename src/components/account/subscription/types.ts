
export interface SubscriptionData {
  plan: string;
  price: string;
  nextBilling: Date;
  status: "active" | "inactive" | "trialing";
  trialEnd: Date;
  isInTrial: boolean;
}
