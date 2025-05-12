
import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { AlertCircle, CalendarIcon, CreditCard, Gift, Clock } from "lucide-react";
import { format, addMonths } from "date-fns";

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
};

const ManageSubscription = () => {
  const [subscription, setSubscription] = useState(mockSubscription);
  const [isLoading, setIsLoading] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isGiftDialogOpen, setIsGiftDialogOpen] = useState(false);
  const [giftEmail, setGiftEmail] = useState("");
  const [isGifting, setIsGifting] = useState(false);
  const [isPortalLoading, setIsPortalLoading] = useState(false);
  
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
  
  const handleCancelSubscription = async () => {
    setIsCancelling(true);
    
    // Mock delay and update UI
    setTimeout(() => {
      setSubscription({
        ...subscription,
        cancelAtPeriodEnd: true,
      });
      
      toast({
        title: "Subscription updated",
        description: "Your subscription will be canceled at the end of the current billing period.",
      });
      
      setIsCancelling(false);
    }, 1000);
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
  
  const handleResumeSubscription = async () => {
    setIsCancelling(true);
    
    // Mock delay and update UI
    setTimeout(() => {
      setSubscription({
        ...subscription,
        cancelAtPeriodEnd: false,
      });
      
      toast({
        title: "Subscription resumed",
        description: "Your subscription has been resumed successfully.",
      });
      
      setIsCancelling(false);
    }, 1000);
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
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle>Your Subscription</CardTitle>
              <CardDescription>Manage your subscription details</CardDescription>
            </div>
            <Badge variant={subscription.status === 'active' ? "default" : "destructive"}>
              {subscription.status === 'active' ? "Active" : "Inactive"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-tobey-orange">
              {subscription.planName}
            </h3>
            <p className="text-2xl font-bold">
              {formatPrice(subscription.amount)}
              <span className="text-base font-normal text-gray-500">
                /{subscription.interval}
              </span>
            </p>
          </div>
          
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
          
          {subscription.cancelAtPeriodEnd && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3 items-start">
              <Clock className="text-amber-500 h-5 w-5 mt-0.5" />
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
                <Label className="mb-1" htmlFor="auto-renew">Auto-renew</Label>
                <span className="text-sm text-gray-500">Automatically renew your subscription</span>
              </div>
              <Switch 
                id="auto-renew" 
                checked={!subscription.cancelAtPeriodEnd}
                onCheckedChange={(checked) => {
                  if (checked) {
                    handleResumeSubscription();
                  } else {
                    handleCancelSubscription();
                  }
                }}
                disabled={isCancelling}
              />
            </div>
          </div>
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
    </>
  );
};

export default ManageSubscription;
