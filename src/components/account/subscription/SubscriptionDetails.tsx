
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CheckCircle2, Calendar, Clock, CreditCard } from "lucide-react";
import { format } from "date-fns";

interface SubscriptionDetailsProps {
  subscriptionData: {
    plan: string;
    price: string;
    nextBilling: Date;
    status: string;
    trialEnd: Date;
    isInTrial: boolean;
  };
  onUpgrade: () => void;
  onCancel: () => void;
  isUpgrading: boolean;
}

const SubscriptionDetails: React.FC<SubscriptionDetailsProps> = ({
  subscriptionData,
  onUpgrade,
  onCancel,
  isUpgrading
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Subscription Details</CardTitle>
            <CardDescription>Manage your subscription plan</CardDescription>
          </div>
          <div className="flex items-center gap-1 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            <CheckCircle2 className="h-4 w-4" />
            <span>Active</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Current Plan Section */}
        <div className="rounded-lg border p-4">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="font-semibold text-lg">Current Plan: {subscriptionData.plan}</h3>
              <p className="text-gray-500 text-sm">{subscriptionData.price} per month</p>
            </div>
            <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Current Plan
            </div>
          </div>
          
          {subscriptionData.isInTrial && (
            <div className="bg-amber-50 border border-amber-100 rounded-md p-3 mb-4 flex items-start gap-2">
              <Clock className="h-5 w-5 text-amber-500 mt-0.5" />
              <div>
                <p className="font-medium text-amber-800">Free Trial Period</p>
                <p className="text-sm text-amber-600">
                  {Math.ceil((subscriptionData.trialEnd.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days remaining in your free trial. 
                  Your subscription will begin on {format(subscriptionData.trialEnd, "MMMM d, yyyy")}.
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Next billing date: {format(subscriptionData.nextBilling, "MMMM d, yyyy")}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-gray-500" />
              <span className="text-sm">
                Plan will auto-renew each month
              </span>
            </div>
          </div>
        </div>
        
        {/* Upgrade Option */}
        <div className="rounded-lg border border-dashed p-4 bg-gray-50">
          <h3 className="font-semibold mb-2">Upgrade to Annual Plan</h3>
          <p className="text-sm text-gray-600 mb-4">
            Save 16% by switching to our annual billing plan at $390 per year.
          </p>
          <Button 
            onClick={onUpgrade} 
            disabled={isUpgrading}
            className="w-full sm:w-auto"
          >
            {isUpgrading ? "Upgrading..." : "Upgrade to Annual Plan"}
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex flex-col items-start pt-0">
        <Separator className="mb-4" />
        <div className="w-full">
          <p className="text-sm text-gray-500 mb-4">
            Need to cancel your subscription? Your student data will be deleted 5 days after cancellation.
          </p>
          <Button 
            variant="outline" 
            onClick={onCancel}
            className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
          >
            Cancel Subscription
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default SubscriptionDetails;
