
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";

interface PaymentFormProps {
  onPaymentComplete: (paymentId: string) => void;
  onBack: () => void;
}

const PaymentForm = ({ onPaymentComplete, onBack }: PaymentFormProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Enhanced helper function to get signup data with better error handling
  const getSignupData = () => {
    const email = localStorage.getItem('user_email');
    const id = localStorage.getItem('signup_id') || 'temp-id';
    
    console.log("Retrieved signup data:", { id, email });
    
    if (!email) {
      console.warn("No email found in localStorage!");
    }
    
    return {
      id,
      email
    };
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) {
      toast({
        title: "Agreement Required",
        description: "Please accept the Terms of Service and Privacy Policy to continue.",
        variant: "destructive"
      });
      return;
    }

    setIsProcessing(true);
    setError(null);
    
    try {
      // Get data from localStorage
      const signupData = getSignupData();
      
      if (!signupData.email) {
        throw new Error('Email address is required. Please go back and complete the profile form.');
      }
      
      if (!signupData.id) {
        throw new Error('Signup ID is missing. Please restart the onboarding process.');
      }
      
      console.log("Submitting checkout data:", {
        signup_id: signupData.id,
        email: signupData.email
      });
      
      const response = await fetch('https://hgpplvegqlvxwszlhzwc.supabase.co/functions/v1/create-checkout-session-june-beta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signup_id: signupData.id,
          email: signupData.email
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create checkout session');
      }
      
      const data = await response.json();
      
      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session: No redirect URL returned');
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      toast({
        title: "Payment Setup Failed",
        description: err instanceof Error ? err.message : "There was an error processing your request. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Subscription Payment</h2>
        <p className="mt-1 text-sm text-gray-500">
          Set up your subscription to access all features of Tobey's Tutor.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Early Adopter Special</CardTitle>
          <CardDescription>Early access to Tobey's Tutor with special beta pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-semibold">$29<span className="text-sm text-gray-500">/month</span></p>
              <p className="text-sm text-gray-500 mt-1">Billed monthly, cancel anytime</p>
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Unlimited access to Tobey's AI tutor</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Personalized learning paths for your child</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Regular progress reports and insights</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Early access to new features</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div className="flex items-top space-x-2 mb-4">
            <Checkbox 
              id="terms" 
              checked={isAgreed} 
              onCheckedChange={(checked) => setIsAgreed(!!checked)} 
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="terms" 
                className="text-sm font-normal text-gray-700"
              >
                I agree to the <a href="https://tobeystutor.com/terms-of-service" className="text-tobey-orange hover:underline">Terms of Service</a> and <a href="https://tobeystutor.com/privacy-policy" className="text-tobey-orange hover:underline">Privacy Policy</a>
              </Label>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Your card will be charged immediately. You can cancel anytime from your account settings.
          </p>
        </CardFooter>
      </Card>

      <form onSubmit={handleSubscribe}>
        <div className="pt-4 border-t border-gray-200 mt-8">
          <p className="text-sm text-gray-500 mb-8">
            Payment information will be securely processed by Stripe. Your card details are never stored on our servers.
          </p>

          {error && (
            <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md">
              {error}
            </div>
          )}

          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
              disabled={isProcessing}
            >
              Back
            </Button>
            <Button 
              type="submit"
              disabled={!isAgreed || isProcessing}
              className="bg-tobey-orange hover:bg-tobey-orange/90 text-white subscribe-now"
            >
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
