
import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("pk_test_51OyDJzBki4wTTDCHbM0vY7j3va34g92xRihThlenRBuc6jGrrNNGYzRHM8Lnu7hWE121JDBqh9iuqRyzO7BsXBIX00WDv2ySxT");

interface StripePaymentElementProps {
  firstName: string;
  lastName: string;
  email: string;
  onPaymentSuccess: (paymentId: string) => void;
}

const StripePaymentElement = ({
  firstName,
  lastName,
  email,
  onPaymentSuccess
}: StripePaymentElementProps) => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const createPaymentIntent = async () => {
      if (!firstName || !lastName || !email) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase.functions.invoke("create-payment-intent", {
          body: { firstName, lastName, email }
        });

        if (error) throw new Error(error.message || "Failed to create payment intent");
        
        if (data && data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          throw new Error("No client secret returned");
        }
      } catch (err) {
        console.error("Error creating payment intent:", err);
        setError(err instanceof Error ? err.message : "An unknown error occurred");
        toast({
          title: "Payment setup failed",
          description: err instanceof Error ? err.message : "Failed to set up payment",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [firstName, lastName, email]);

  const handlePaymentError = (errorMessage: string) => {
    setError(errorMessage);
  };

  return (
    <div className="w-full mt-6">
      <h3 className="text-lg font-medium mb-4">Payment</h3>
      
      {error && (
        <div className="p-3 mb-4 text-sm text-red-500 bg-red-50 rounded-md">
          {error}
        </div>
      )}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-10 h-10 border-4 border-dashed rounded-full animate-spin border-tobey-orange"></div>
        </div>
      ) : clientSecret ? (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm 
            clientSecret={clientSecret}
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={handlePaymentError}
            isLoading={isLoading}
          />
        </Elements>
      ) : (
        <div className="py-4 text-center text-gray-500">
          Preparing payment form...
        </div>
      )}
    </div>
  );
};

export default StripePaymentElement;
