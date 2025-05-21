
import { useEffect, useRef } from "react";

interface BetaPaymentSectionProps {
  userId: string | null;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
}

const BetaPaymentSection = ({ userId, paymentError, setPaymentError }: BetaPaymentSectionProps) => {
  const stripeButtonInitialized = useRef(false);
  
  // Update the Stripe Button with the Supabase UUID
  const updateStripeButton = (supabaseUuid: string) => {
    stripeButtonInitialized.current = false;
    setPaymentError(null);
    
    const stripeButton = document.querySelector('stripe-buy-button');
    if (stripeButton) {
      try {
        // Set the client-reference-id attribute directly
        stripeButton.setAttribute('client-reference-id', supabaseUuid);
        
        // Show the payment container
        const paymentContainer = document.getElementById('payment-button-container');
        if (paymentContainer) {
          paymentContainer.style.display = 'block';
        }
        
        console.log("Stripe button updated with client-reference-id:", supabaseUuid);
        stripeButtonInitialized.current = true;
        
      } catch (error) {
        console.error("Error updating Stripe button:", error);
        setPaymentError("Failed to initialize payment form. Please try again.");
      }
    } else {
      setPaymentError("Payment form could not be loaded. Please refresh the page and try again.");
    }
  };

  // Initialize the Stripe button when userId changes
  useEffect(() => {
    if (userId) {
      setTimeout(() => {
        updateStripeButton(userId);
      }, 100);
    }
  }, [userId, setPaymentError]);

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
        <stripe-buy-button
          buy-button-id="buy_btn_1RJ0FPBpB9LJmKwiQfros2F2"
          publishable-key="pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu"
        >
        </stripe-buy-button>
      </div>
    </div>
  );
};

export default BetaPaymentSection;
