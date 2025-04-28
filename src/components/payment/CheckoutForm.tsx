
import { useState } from "react";
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
  const [isProcessing, setIsProcessing] = useState(false);

  // Simplified mock payment for now - this will be replaced when Stripe dependencies work
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsProcessing(true);
    
    try {
      // Simulate a successful payment
      setTimeout(() => {
        const mockPaymentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
        toast({
          title: "Payment successful!",
          description: "Your beta registration is being processed.",
        });
        onPaymentSuccess(mockPaymentId);
        setIsProcessing(false);
      }, 2000);
    } catch (err) {
      console.error("Error processing payment:", err);
      onPaymentError(err instanceof Error ? err.message : "An unknown error occurred");
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4">
      <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
        <p className="text-center text-gray-600">
          Payment processing is temporarily in test mode.
        </p>
      </div>
      
      <div className="pt-2">
        <Button
          type="submit"
          className="w-full btn-primary text-lg py-6"
          disabled={isProcessing || isLoading}
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
