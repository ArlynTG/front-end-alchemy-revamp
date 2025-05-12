
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2, AlertCircle, Calendar, Clock, CreditCard } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { format, addDays } from "date-fns";

const ManageSubscription = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [cancelReason, setCancelReason] = useState<string | null>(null);

  // Mock data - in real app would come from API
  const subscriptionData = {
    plan: "Monthly",
    price: "$79.99",
    nextBilling: addDays(new Date(), 15),
    status: "active",
    trialEnd: addDays(new Date(), 10),
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
    return (
      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
          <CardDescription>Loading subscription information...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
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
              Save 15% by switching to our annual billing plan at $814 per year.
            </p>
            <Button 
              onClick={handleUpgrade} 
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
              onClick={() => setShowCancelDialog(true)}
              className="text-red-500 hover:text-red-600 hover:bg-red-50 border-red-200"
            >
              Cancel Subscription
            </Button>
          </div>
        </CardFooter>
      </Card>
      
      {/* Cancel Subscription Dialog */}
      <Dialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              We're sorry to see you go. Please let us know why you're cancelling so we can improve our service.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <RadioGroup value={cancelReason || ""} onValueChange={setCancelReason} className="space-y-3">
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="too-expensive" id="too-expensive" />
                <Label className="font-normal" htmlFor="too-expensive">
                  The service is too expensive
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="not-helpful" id="not-helpful" />
                <Label className="font-normal" htmlFor="not-helpful">
                  The service isn't helpful for my student
                </Label>
              </div>
              
              <div className="flex items-start space-x-2">
                <RadioGroupItem value="other-reason" id="other-reason" />
                <Label className="font-normal" htmlFor="other-reason">
                  Other reason
                </Label>
              </div>
            </RadioGroup>
            
            <div className="mt-6 bg-amber-50 p-3 rounded-md border border-amber-100">
              <div className="flex gap-2">
                <AlertCircle className="h-5 w-5 text-amber-500" />
                <p className="text-sm text-amber-800 font-medium">Important Notice</p>
              </div>
              <p className="text-sm text-amber-700 mt-1">
                All student data, including progress records and personalized materials, will be permanently deleted 5 days after cancellation.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowCancelDialog(false)}>
              Keep Subscription
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleCancel}
              disabled={!cancelReason}
            >
              Confirm Cancellation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageSubscription;
