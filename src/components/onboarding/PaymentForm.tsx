
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';

// Import our custom Stripe payment component
import StripePaymentElement from '@/components/payment/StripePaymentElement';

interface PaymentFormProps {
  onPaymentComplete: (paymentId: string) => void;
  onBack: () => void;
  profileData?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

// Initialize Stripe outside component to avoid recreating on renders
// This uses the public key which is safe to expose in client-side code
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51PEymDIoP8aRuMvMGExvvOLgU5TJvpXY8UHftGpQcYvSXNwZyiR1ULQDl9NerGwTbqD3hPGcWO5NsytaLLTIbGaw00oZ4o4Sum');

const PaymentForm = ({ onPaymentComplete, onBack, profileData }: PaymentFormProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const { toast } = useToast();

  // Create payment intent when component mounts or profile data changes
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        setIsProcessing(true);
        
        // Call our Supabase Edge Function to create a payment intent
        const { data, error } = await supabase.functions.invoke('create-payment-intent', {
          body: {
            firstName: profileData?.firstName || '',
            lastName: profileData?.lastName || '',
            email: profileData?.email || '',
            priceId: 'price_monthly_subscription', // This would be your actual price ID
          },
        });

        if (error) {
          console.error('Error creating payment intent:', error);
          toast({
            title: "Payment Setup Error",
            description: "Unable to initialize payment. Please try again.",
            variant: "destructive",
          });
          return;
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        console.error('Error setting up payment:', err);
        toast({
          title: "Payment Setup Error",
          description: "There was a problem connecting to Stripe. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsProcessing(false);
      }
    };

    // Only create payment intent if we have user data
    if (profileData?.email) {
      createPaymentIntent();
    }
  }, [profileData, toast]);

  // Configure Stripe appearance options
  const appearance = {
    theme: 'stripe',
    variables: {
      colorPrimary: '#ff6b35', // tobey-orange
    },
  };

  // Options to pass to Elements
  const options = clientSecret ? {
    clientSecret,
    appearance,
  } : undefined;

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

      <div className="pt-4 border-t border-gray-200 mt-8">
        <p className="text-sm text-gray-500 mb-6">
          Payment information will be securely processed by Stripe. Your card details are never stored on our servers.
        </p>

        {clientSecret ? (
          <div className="mb-6">
            <Elements stripe={stripePromise} options={options}>
              <StripePaymentElement 
                isAgreed={isAgreed}
                onBack={onBack}
                onPaymentComplete={onPaymentComplete}
                customerInfo={profileData}
              />
            </Elements>
          </div>
        ) : (
          <div className="p-4 border border-gray-200 rounded-md bg-gray-50 mb-6">
            <p className="text-center text-gray-500">
              {isProcessing ? "Setting up payment form..." : "Unable to load payment form. Please check your connection."}
            </p>
          </div>
        )}

        {!clientSecret && (
          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
            >
              Back
            </Button>
            <Button 
              type="button"
              disabled={true}
              className="bg-tobey-orange hover:bg-tobey-orange/90 text-white"
            >
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;
