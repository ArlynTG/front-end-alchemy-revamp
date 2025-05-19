
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { RegistrationFormValues } from "@/utils/formSchemas";
import { Loader2 } from "lucide-react";

interface RegistrationPaymentFormProps {
  formData: RegistrationFormValues;
  onPaymentSuccess: (paymentId: string) => void;
  onBackToDetails: () => void;
  isLoading: boolean;
  isStripeLoaded: boolean;
}

const RegistrationPaymentForm = ({
  formData,
  onPaymentSuccess,
  onBackToDetails,
  isLoading,
  isStripeLoaded
}: RegistrationPaymentFormProps) => {
  const [stripeButtonInitialized, setStripeButtonInitialized] = useState(false);
  
  useEffect(() => {
    if (!isStripeLoaded) return;
    
    // Initialize Stripe Buy Button with client reference ID
    const initializeStripeButton = () => {
      try {
        // Create a unique ID for this transaction
        const transactionId = `user-${formData.email}-${Date.now()}`;
        localStorage.setItem('registration_transaction_id', transactionId);
        
        // Initialize Stripe button when script is loaded
        const stripeButton = document.querySelector('stripe-buy-button');
        if (stripeButton) {
          stripeButton.setAttribute('client-reference-id', transactionId);
          console.log("Stripe button initialized with client reference ID:", transactionId);
          setStripeButtonInitialized(true);
        } else {
          console.error("Stripe button element not found");
        }
      } catch (error) {
        console.error("Error initializing Stripe button:", error);
      }
    };
    
    // Small delay to ensure the DOM is ready
    const timer = setTimeout(initializeStripeButton, 300);
    return () => clearTimeout(timer);
  }, [formData.email, isStripeLoaded]);
  
  // Handle successful Stripe payment
  useEffect(() => {
    if (!stripeButtonInitialized) return;
    
    const handleStripeMessage = (event: MessageEvent) => {
      if (event.data?.type === 'stripe-buy-button:transaction-complete') {
        console.log("Stripe payment completed successfully", event.data);
        
        // Get transaction ID from the stored value
        const transactionId = localStorage.getItem('registration_transaction_id') || 
                             `payment-${Date.now()}`;
        
        // Call the success callback
        onPaymentSuccess(transactionId);
      }
    };
    
    window.addEventListener('message', handleStripeMessage);
    return () => window.removeEventListener('message', handleStripeMessage);
  }, [stripeButtonInitialized, onPaymentSuccess]);
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Payment Information</h3>
        <p className="mt-1 text-sm text-gray-500">
          Complete your payment to secure your spot in our beta program.
        </p>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500 mb-4">
          Payment information will be securely processed by Stripe. Your card details are never stored on our servers.
        </p>
        
        {!isStripeLoaded ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="h-8 w-8 animate-spin text-gray-400 mb-2" />
            <p className="text-gray-500">Loading payment system...</p>
          </div>
        ) : (
          <div className="flex justify-center mb-6">
            <stripe-buy-button
              buy-button-id="buy_btn_1RQGPXBpB9LJmKwiM4EJ2XGa"
              publishable-key="pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu"
            >
            </stripe-buy-button>
          </div>
        )}
        
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBackToDetails}
            disabled={isLoading}
          >
            Back
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPaymentForm;
