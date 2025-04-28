
import { useState } from "react";
import { 
  useStripe, 
  useElements, 
  PaymentElement,
  AddressElement
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface CheckoutFormProps {
  clientSecret: string;
  onPaymentSuccess: (paymentId: string) => void;
  onPaymentError: (error: string) => void;
  isLoading: boolean;
}

const CheckoutForm = ({
  clientSecret,
  onPaymentSuccess,
  onPaymentError,
  isLoading
}: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe hasn't loaded yet
      return;
    }

    setIsProcessing(true);

    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: 'if_required',
      });

      if (error) {
        console.error("Payment failed:", error);
        onPaymentError(error.message || "An unknown error occurred");
        toast({
          title: "Payment failed",
          description: error.message || "An unknown error occurred",
          variant: "destructive",
        });
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        toast({
          title: "Payment successful!",
          description: "Your beta registration is being processed.",
        });
        onPaymentSuccess(paymentIntent.id);
      }
    } catch (err) {
      console.error("Error processing payment:", err);
      onPaymentError(err instanceof Error ? err.message : "An unknown error occurred");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <PaymentElement />
      
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full btn-primary text-lg py-6"
          disabled={isProcessing || !stripe || !elements || isLoading}
        >
          {isProcessing ? "Processing..." : "Pay $1 to Reserve Your Spot"}
        </Button>
      </div>
      
      <div className="text-xs text-center text-gray-500">
        Your card will be charged $1 to confirm your spot in our beta program.
        <br />
        Limited to 200 early adopters.
      </div>
    </form>
  );
};

export default CheckoutForm;
