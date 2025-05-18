
import { useState, useEffect } from 'react';
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
  
  useEffect(() => {
    // Debug: Log all localStorage items at mount
    console.log('LocalStorage items at mount:', {
      email: localStorage.getItem('user_email'),
      name: localStorage.getItem('user_name'),
      firstName: localStorage.getItem('user_first_name'),
      lastName: localStorage.getItem('user_last_name'),
      signupId: localStorage.getItem('signup_id')
    });
    
    // Check for email on component mount
    const email = localStorage.getItem('user_email');
    if (!email) {
      setError('Email address is missing. Please go back and complete the profile form first.');
      // Only show toast notification, don't duplicate with error state
      toast({
        title: "Missing Information",
        description: "Email address is required. Please complete the profile form.",
        variant: "destructive"
      });
    }
  }, []);
  
  // Improved function to get signup data
  const getSignupData = () => {
    const email = localStorage.getItem('user_email');
    const signupId = localStorage.getItem('signup_id') || `temp-id-${Date.now()}`;
    
    console.log('Retrieved signup data:', { signupId, email });
    
    return { id: signupId, email: email };
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
      // Get data from localStorage with detailed logging
      const signupData = getSignupData();
      
      if (!signupData.email) {
        throw new Error('Email address is required. Please go back and complete the profile form.');
      }
      
      console.log("Submitting checkout data:", {
        signup_id: signupData.id,
        email: signupData.email
      });
      
      const response = await fetch('https://hgpplvegqlvxwszlhzwc.supabase.co/functions/v1/create-checkout-session-june-beta', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHBsdmVncWx2eHdzemxoendjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NzU2NDEsImV4cCI6MjA2MDM1MTY0MX0.yMqquc9J0EhBA7lS7c-vInK6NC00BqTt5gKjMt7jl4I`
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
      console.log("Checkout session created:", data);
      
      if (data.url) {
        // Save session ID if available and call onPaymentComplete
        if (data.session_id) {
          localStorage.setItem('checkout_session_id', data.session_id);
          // Call onPaymentComplete with the session ID before redirect
          onPaymentComplete(data.session_id);
        } else {
          // If no session_id in response, still call onPaymentComplete with a generic ID
          onPaymentComplete(`session-${Date.now()}`);
        }
        
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error('Failed to create checkout session: No redirect URL returned');
      }
    } catch (err) {
      console.error('Error:', err);
      // Set error state but don't show duplicate toast
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      // Show only one toast notification for errors
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

      {/* Remove this error display to prevent duplication with toast notifications */}

      <form onSubmit={handleSubscribe}>
        <div className="pt-4 border-t border-gray-200 mt-8">
          <p className="text-sm text-gray-500 mb-8">
            Payment information will be securely processed by Stripe. Your card details are never stored on our servers.
          </p>

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
