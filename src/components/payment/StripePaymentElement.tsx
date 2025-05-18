
import { useState } from 'react';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';
import { Button } from "@/components/ui/button";
import { useToast } from '@/components/ui/use-toast';

interface StripePaymentElementProps {
  isAgreed: boolean;
  onBack: () => void;
  onPaymentComplete: (paymentId: string) => void;
  customerInfo?: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
}

const StripePaymentElement = ({ 
  isAgreed, 
  onBack, 
  onPaymentComplete,
  customerInfo
}: StripePaymentElementProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements || !isAgreed) {
      // Stripe not loaded or user hasn't agreed to terms
      return;
    }

    setIsProcessing(true);

    // For subscription, we use setupIntent instead of paymentIntent
    const result = await stripe.confirmSetup({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/account`, // Where to redirect after successful setup
      },
      redirect: 'if_required',
    });

    if (result.error) {
      // Show error to your customer
      toast({
        title: "Payment Error",
        description: result.error.message || "Something went wrong with your payment",
        variant: "destructive",
      });
      setIsProcessing(false);
    } else if (result.setupIntent?.status === 'succeeded') {
      // Setup intent succeeded, call the completion handler
      toast({
        title: "Payment Setup Successful",
        description: "Your subscription is now active",
      });
      onPaymentComplete(result.setupIntent.id);
    } else {
      // Handle cases like setup_intent.requires_action
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement 
        options={{
          defaultValues: {
            billingDetails: {
              name: customerInfo?.firstName && customerInfo?.lastName ? 
                `${customerInfo.firstName} ${customerInfo.lastName}` : undefined,
              email: customerInfo?.email,
            }
          },
          layout: 'tabs'
        }} 
      />
      
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
          disabled={!stripe || !elements || !isAgreed || isProcessing}
          className="bg-tobey-orange hover:bg-tobey-orange/90 text-white"
        >
          {isProcessing ? "Processing..." : "Subscribe Now"}
        </Button>
      </div>
    </form>
  );
};

export default StripePaymentElement;
