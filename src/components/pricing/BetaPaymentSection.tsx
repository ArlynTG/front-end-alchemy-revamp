
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { STRIPE_CHECKOUT_URL } from "@/utils/betaSignupService";

interface BetaPaymentSectionProps {
  userId: string | null;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
}

const BetaPaymentSection = ({ userId, paymentError, setPaymentError }: BetaPaymentSectionProps) => {
  // Handle redirect to Stripe
  const handleCheckout = () => {
    if (!userId) {
      setPaymentError("Registration ID not found. Please try again.");
      return;
    }
    
    try {
      // Create URL with client reference ID
      const url = new URL(STRIPE_CHECKOUT_URL);
      url.searchParams.append('client_reference_id', userId);
      
      // Open in current tab
      window.location.href = url.toString();
    } catch (error) {
      console.error("Error redirecting to Stripe:", error);
      setPaymentError("Failed to open payment page. Please try again.");
    }
  };

  return (
    <div className="py-6 text-center">
      <div className="mb-6">
        <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
          <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-lg font-medium mb-2">Registration Complete!</h3>
        <p className="text-gray-600 mb-6">
          Complete your payment to secure your spot in our beta program.
        </p>
      </div>

      {paymentError && (
        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
          {paymentError}
        </div>
      )}

      <div id="payment-button-container" className="flex justify-center mb-4">
        <Button 
          onClick={handleCheckout}
          className="bg-tobey-orange hover:bg-tobey-orange/90 text-white px-8 py-6 text-lg font-medium"
        >
          Reserve Your Spot for $1
        </Button>
      </div>
    </div>
  );
};

export default BetaPaymentSection;
