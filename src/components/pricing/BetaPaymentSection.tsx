
import { useEffect } from "react";
import { STRIPE_CHECKOUT_URL } from "@/utils/betaSignupService";

interface BetaPaymentSectionProps {
  userId: string | null;
  paymentError: string | null;
  setPaymentError: (error: string | null) => void;
}

const BetaPaymentSection = ({ userId, paymentError, setPaymentError }: BetaPaymentSectionProps) => {
  // Set up the Stripe button with the client reference ID (userId)
  useEffect(() => {
    // Check if Stripe script is already loaded
    if (!document.querySelector('script[src="https://js.stripe.com/v3/buy-button.js"]')) {
      const script = document.createElement('script');
      script.src = 'https://js.stripe.com/v3/buy-button.js';
      script.async = true;
      document.head.appendChild(script);
    }
    
    // Set the client reference ID if userId exists
    if (userId) {
      setTimeout(() => {
        const stripeButton = document.querySelector('stripe-buy-button');
        if (stripeButton) {
          stripeButton.setAttribute('client-reference-id', userId);
          console.log("Set client reference ID on Stripe button:", userId);
        } else {
          setPaymentError("Payment button could not be initialized. Please refresh the page.");
        }
      }, 500); // Small delay to ensure the button is in the DOM
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
          buy-button-id="buy_btn_1RROv2BpB9LJmKwiJTDSTCPl"
          publishable-key="pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu"
        >
        </stripe-buy-button>
      </div>
    </div>
  );
};

export default BetaPaymentSection;
