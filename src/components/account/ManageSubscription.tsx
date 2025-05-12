
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, CalendarIcon, CreditCard, Gift, Clock, AlertTriangle } from "lucide-react";
import { format, addMonths, differenceInDays } from "date-fns";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// Helper to format price for display
const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount / 100);
};

// Mock subscription data
const mockSubscription = {
  id: "sub_mock123456",
  planName: "Early Adopter",
  status: "active",
  currentPeriodEnd: addMonths(new Date(), 1).toISOString(),
  amount: 2900, // $29.00
  interval: "month",
  cancelAtPeriodEnd: false,
  isTrial: true,
  trialEnd: addMonths(new Date(), 1).toISOString(),
};

// Plan upgrade options
const subscriptionPlans = {
  monthly: {
    name: "Monthly Plan",
    amount: 2900, // $29.00
    interval: "month",
    annualSavings: 0,
  },
  annual: {
    name: "Annual Plan",
    amount: 28000, // $280.00 (instead of $348 - $29 * 12)
    interval: "year",
    annualSavings: 6800, // $68.00 savings
  }
};

const ManageSubscription = () => {
  const [subscription, setSubscription] = useState(mockSubscription);
  const [isLoading, setIsLoading] = useState(false);
  const [isUpgrading, setIsUpgrading] = useState(false);
  const [isGiftDialogOpen, setIsGiftDialogOpen] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");
  const [isGifting, setIsGifting] = useState(false);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  const [isCancellationDialogOpen, setIsCancellationDialogOpen] = useState(false);
  const [cancellationReason, setCancellationReason] = useState("");
  const [isCancelling, setIsCancelling] = useState(false);
  const [isUpgradeDialogOpen, setIsUpgradeDialogOpen] = useState(false);
  
  const handleOpenStripePortal = async () => {
    setIsPortalLoading(true);
    
    // Mock delay and show toast
    setTimeout(() => {
      toast({
        title: "Payment Portal",
        description: "In a production app, this would open the Stripe Customer Portal in a new tab.",
      });
      setIsPortalLoading(false);
    }, 1000);
  };
  
  const handleUpgradeToAnnual = async () => {
    setIsUpgrading(true);
    
    // Mock delay and show toast
    setTimeout(() => {
      setSubscription({
        ...subscription,
        planName: "Early Adopter (Annual)",
        amount: subscriptionPlans.annual.amount,
        interval: "year",
        currentPeriodEnd: addMonths(new Date(), 12).toISOString(),
      });
      
      toast({
        title: "Plan upgraded",
        description: "Your subscription has been upgraded to the annual plan.",
      });
      
      setIsUpgrading(false);
      setIsUpgradeDialogOpen(false);
    }, 1500);
  };
  
  const handleGiftSubscription = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGifting(true);
    
    // Mock delay and show toast
    setTimeout(() => {
      toast({
        title: "Gift sent!",
        description: `We've sent an invitation to ${giftEmail} to claim their gift subscription.`,
      });
      
      setIsGiftDialogOpen(false);
      setGiftEmail("");
      setIsGifting(false);
    }, 1000);
  };
  
  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    
    // Mock delay and update UI
    setTimeout(() => {
      setSubscription({
        ...subscription,
        status: "cancelling",
      });
      
      toast({
        title: "Subscription cancelled",
        description: "Your subscription has been cancelled and will end at the current billing period. Your child's data will be deleted in 5 days.",
      });
      
      setIsCancelling(false);
      setIsCancellationDialogOpen(false);
    }, 1500);
  };

  const getDaysRemaining = () => {
    if (subscription.isTrial) {
      const trialEndDate = new Date(subscription.trialEnd);
      return Math.max(0, differenceInDays(trialEndDate, new Date()));
    }
    return 0;
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Subscription</CardTitle>
          <CardDescription>Loading your subscription details...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-8">
          <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
        </CardContent>
      </Card>
    );
  }

  // Show this UI if the user doesn't have an active subscription
  if (false) { // Changed to false to show the subscription UI instead
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Subscription</CardTitle>
          <CardDescription>You don't have an active subscription yet.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start">
            <AlertCircle className="text-amber-500 h-5 w-5 mt-0.5" />
            <div>
              <p className="text-sm text-amber-800">
                Subscribe to Tobey's Tutor to access personalized learning plans for your child.
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => window.location.href = "/#pricing"}
            className="w-full md:w-auto"
          >
            View Plans
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Your Subscription</CardTitle>
              <CardDescription>Manage your subscription details</CardDescription>
            </div>
            <div className="flex flex-col items-end gap-2">
              <Badge variant={subscription.status === 'active' ? "default" : "destructive"}>
                {subscription.status === 'active' ? "Active" : subscription.status === 'cancelling' ? "Cancelling" : "Inactive"}
              </Badge>
              
              {subscription.isTrial && (
                <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                  Trial
                </Badge>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-tobey-orange">
                Current Plan: {subscription.planName}
              </h3>
              {subscription.interval === "month" && (
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  Monthly
                </Badge>
              )}
              {subscription.interval === "year" && (
                <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                  Annual
                </Badge>
              )}
            </div>
            <p className="text-2xl font-bold">
              {formatPrice(subscription.amount)}
              <span className="text-base font-normal text-gray-500">
                /{subscription.interval}
              </span>
            </p>
          </div>
          
          {subscription.isTrial && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 items-start">
              <Clock className="text-blue-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-800">
                  Free Trial
                </p>
                <p className="text-sm text-blue-700">
                  {getDaysRemaining()} days remaining in your free trial
                </p>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Current period ends</p>
                <p className="font-medium">
                  {format(new Date(subscription.currentPeriodEnd), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm text-gray-500">Payment method</p>
                <p className="font-medium">••••-1234</p>
              </div>
            </div>
          </div>
          
          {subscription.status === 'cancelling' && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start">
              <AlertCircle className="text-amber-500 h-5 w-5 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-amber-800">Your subscription is set to cancel</p>
                <p className="text-sm text-amber-700">
                  Access will end on {format(new Date(subscription.currentPeriodEnd), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
          )}
          
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <p className="font-medium mb-1">Auto-renewal</p>
                <span className="text-sm text-gray-500">
                  Your subscription will automatically renew every {subscription.interval}
                  {subscription.interval === "month" ? " on " : " in "}
                  {format(new Date(subscription.currentPeriodEnd), "MMMM d, yyyy")}
                </span>
              </div>
            </div>
          </div>

          {subscription.interval === "month" && subscription.status !== 'cancelling' && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <h4 className="font-medium text-green-800">Upgrade to Annual Plan</h4>
                  <Badge variant="outline" className="bg-green-100 text-green-700 border-green-300">
                    Save {formatPrice(subscriptionPlans.annual.annualSavings)}
                  </Badge>
                </div>
                <p className="text-sm text-green-700">
                  Switch to our annual plan and save {formatPrice(subscriptionPlans.annual.annualSavings)} per year.
                </p>
                <Button 
                  variant="outline" 
                  className="bg-white text-green-700 border-green-300 hover:bg-green-50 w-full sm:w-auto"
                  onClick={() => setIsUpgradeDialogOpen(true)}
                >
                  Upgrade to Annual
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col sm:flex-row gap-3">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto"
            onClick={handleOpenStripePortal}
            disabled={isPortalLoading}
          >
            {isPortalLoading ? "Loading..." : "Manage Payment Methods"}
          </Button>
          <Button 
            className="w-full sm:w-auto"
            onClick={() => setIsGiftDialogOpen(true)}
          >
            <Gift className="mr-2 h-4 w-4" /> Gift a Subscription
          </Button>
        </CardFooter>
      </Card>
      
      {subscription.status !== 'cancelling' && (
        <Card className="border-destructive/20 bg-destructive/5">
          <CardHeader className="pb-3">
            <CardTitle className="text-base text-destructive">Cancel Subscription</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-destructive/80 mb-4">
              Cancelling your subscription will stop recurring payments. Your access will continue until
              {format(new Date(subscription.currentPeriodEnd), " MMMM d, yyyy")}. Your child's data will be deleted 5 days after cancellation.
            </p>
            <Button 
              variant="destructive" 
              size="sm" 
              className="w-full md:w-auto"
              onClick={() => setIsCancellationDialogOpen(true)}
            >
              Cancel Subscription
            </Button>
          </CardContent>
        </Card>
      )}
      
      {/* Gift Subscription Dialog */}
      <Dialog open={isGiftDialogOpen} onOpenChange={setIsGiftDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gift a Subscription</DialogTitle>
            <DialogDescription>
              Share the gift of personalized learning with someone special.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleGiftSubscription}>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="gift-email">Recipient's Email</Label>
                <Input
                  id="gift-email"
                  type="email"
                  placeholder="friend@example.com"
                  value={giftEmail}
                  onChange={(e) => setGiftEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
                <p className="text-sm text-blue-800">
                  Your recipient will receive an email with instructions on how to redeem their gift subscription.
                </p>
              </div>
            </div>
            
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsGiftDialogOpen(false)}
                disabled={isGifting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isGifting}>
                {isGifting ? "Sending..." : "Send Gift"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Upgrade Plan Dialog */}
      <Dialog open={isUpgradeDialogOpen} onOpenChange={setIsUpgradeDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Upgrade to Annual Plan</DialogTitle>
            <DialogDescription>
              Save more with our annual subscription plan
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border rounded-md p-3 bg-gray-50">
                <p className="font-medium">Current Plan (Monthly)</p>
                <p className="text-lg font-bold">
                  {formatPrice(subscriptionPlans.monthly.amount)}
                  <span className="text-sm font-normal text-gray-500">/month</span>
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  {formatPrice(subscriptionPlans.monthly.amount * 12)}/year
                </p>
              </div>
              
              <div className="border-2 border-green-500 rounded-md p-3 bg-green-50 relative">
                <p className="font-medium">Annual Plan</p>
                <p className="text-lg font-bold">
                  {formatPrice(subscriptionPlans.annual.amount)}
                  <span className="text-sm font-normal text-gray-500">/year</span>
                </p>
                <p className="text-sm text-green-600 mt-2">
                  Save {formatPrice(subscriptionPlans.annual.annualSavings)}/year
                </p>
                <Badge className="absolute -top-2 -right-2 bg-green-500">
                  Best Value
                </Badge>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              <p className="text-sm text-blue-800">
                You'll be charged {formatPrice(subscriptionPlans.annual.amount)} today. Your new billing date will be {format(addMonths(new Date(), 12), "MMMM d, yyyy")}.
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUpgradeDialogOpen(false)}
              disabled={isUpgrading}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleUpgradeToAnnual}
              disabled={isUpgrading}
            >
              {isUpgrading ? "Processing..." : "Upgrade to Annual"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Cancellation Dialog */}
      <Dialog open={isCancellationDialogOpen} onOpenChange={setIsCancellationDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Cancel Subscription</DialogTitle>
            <DialogDescription>
              We're sorry to see you go. Please let us know why you're cancelling.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div className="bg-amber-50 border border-amber-100 rounded-md p-4 flex gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-medium">Important</p>
                <p>All your child's data will be permanently deleted 5 days after cancellation.</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Please select a reason for cancellation</Label>
              <RadioGroup className="space-y-2" onValueChange={setCancellationReason} value={cancellationReason}>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="too-expensive" id="r1" />
                  <Label htmlFor="r1">Too expensive</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="not-useful" id="r2" />
                  <Label htmlFor="r2">Not useful for my child</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="r3" />
                  <Label htmlFor="r3">Other reason</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCancellationDialogOpen(false)}
              disabled={isCancelling}
            >
              Keep Subscription
            </Button>
            <Button 
              variant="destructive"
              onClick={handleCancelSubscription}
              disabled={isCancelling || !cancellationReason}
            >
              {isCancelling ? "Processing..." : "Confirm Cancellation"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ManageSubscription;
