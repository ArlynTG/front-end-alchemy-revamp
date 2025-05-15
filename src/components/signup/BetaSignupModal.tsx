
import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { DetailedSignupFormValues } from "@/utils/formSchemas";
import { toast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import BetaSignupForm from "@/components/pricing/BetaSignupForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { submitSignupData } from "@/utils/signupDataService";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
}

const BetaSignupModal = ({ isOpen, onClose, planId }: BetaSignupModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
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

  const handleDetailsSubmit = async (data: DetailedSignupFormValues): Promise<void> => {
    console.log("Submitting form with data:", data);
    console.log("Plan ID:", planId);
    setIsSubmitting(true);
    setPaymentError(null);

    try {
      // Format the data for the signup_data table
      const signupData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        student_name: data.studentName || "",
        phone: data.phone,
        student_age: data.studentAge,
        learning_difference: data.primaryLearningDifference,
        plan_type: planId
      };
      
      console.log("Submitting data to signup_data table:", signupData);
      
      // Use the submitSignupData function from signupDataService.ts
      const { success, error } = await submitSignupData(signupData);
      
      if (!success) {
        throw new Error(error || "Failed to submit registration");
      }
      
      // Re-fetch the inserted data to get its ID (we need this for Stripe)
      const { data: insertedData, error: fetchError } = await supabase
        .from('signup_data')
        .select('id')
        .eq('email', data.email)
        .limit(1)
        .single();

      if (fetchError) {
        console.error("Error fetching inserted data:", fetchError);
        throw new Error(`Failed to retrieve registration details: ${fetchError.message || 'Unknown error'}`);
      }

      console.log("Registration successful with inserted data:", insertedData);
      
      // Get the UUID from the inserted data
      const newUserId = insertedData.id;
      setUserId(newUserId);
      
      // Save confirmation data to localStorage to handle page transitions
      const confirmationData = {
        firstName: data.firstName,
        studentFirstName: data.studentName?.split(' ')[0] || '',
        email: data.email,
        registrationId: newUserId
      };
      localStorage.setItem('betaConfirmationData', JSON.stringify(confirmationData));
      
      // Show form submitted state with Stripe button
      setFormSubmitted(true);
      
      // Update Stripe button with client reference ID
      setTimeout(() => {
        updateStripeButton(newUserId);
      }, 100);
      
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  // Reset form when modal is closed or opened
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset when closing
      setFormSubmitted(false);
      setUserId(null);
      setIsSubmitting(false);
      setPaymentError(null);
      stripeButtonInitialized.current = false;
      onClose();
    }
  };

  // Add a listener to detect successful Stripe transactions
  useEffect(() => {
    if (formSubmitted && userId) {
      const handleStripeSuccess = () => {
        console.log("Stripe payment completed successfully");
      };
      
      window.addEventListener('message', (event) => {
        if (event.data?.type === 'stripe-buy-button:transaction-complete') {
          handleStripeSuccess();
        }
      });
    }
  }, [formSubmitted, userId]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`sm:max-w-md md:max-w-xl ${isMobile ? 'h-[calc(100vh-4rem)] max-h-full mt-16 pt-6' : ''}`}>
        <DialogHeader className={isMobile ? 'pb-2' : ''}>
          <DialogTitle className="text-2xl font-medium">Reserve Your Spot for $1</DialogTitle>
          <DialogDescription>
            Join our founding community of 200 families. Complete the form below to secure your place.
          </DialogDescription>
        </DialogHeader>
        
        <div className={isMobile ? 'overflow-y-auto max-h-[calc(100vh-12rem)] pb-4' : ''}>
          {!formSubmitted ? (
            <BetaSignupForm 
              onSubmit={handleDetailsSubmit}
              onCancel={onClose}
              isSubmitting={isSubmitting}
            />
          ) : (
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
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
