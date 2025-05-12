
import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { addDays } from "date-fns";
import SubscriptionDetails from "./subscription/SubscriptionDetails";
import CancellationDialog from "./subscription/CancellationDialog";
import LoadingState from "./subscription/LoadingState";
import { SubscriptionData } from "./subscription/types";

const ManageSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState<string | null>(null);

  // Mock data - in real app would come from API
  const subscriptionData: SubscriptionData = {
    plan: "Early Adopter Plan",
    price: "$29.00",
    nextBilling: addDays(new Date(), 15),
    status: "active",
    trialEnd: addDays(new Date(), 7),
    isInTrial: true,
  };

  const handleUpgrade = () => {
    setIsUpgrading(true);
    
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Subscription upgraded",
        description: "You have successfully upgraded to the annual plan.",
      });
      setIsUpgrading(false);
    }, 1500);
  };

  const handleCancel = () => {
    // Mock API call
    setTimeout(() => {
      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been cancelled and will end at the billing period. Student data will be deleted in 5 days.",
        variant: "destructive"
      });
      setShowCancelDialog(false);
    }, 1500);
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <>
      <SubscriptionDetails 
        subscriptionData={subscriptionData}
        onUpgrade={handleUpgrade}
        onCancel={() => setShowCancelDialog(true)}
        isUpgrading={isUpgrading}
      />
      
      <CancellationDialog 
        isOpen={showCancelDialog}
        onClose={() => setShowCancelDialog(false)}
        onCancel={handleCancel}
        cancelReason={cancelReason}
        onReasonChange={(value) => setCancelReason(value)}
      />
    </>
  );
};

export default ManageSubscription;
