
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { DetailedSignupFormValues } from "@/utils/formSchemas";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import BetaSignupForm from "./BetaSignupForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { supabase } from "@/integrations/supabase/client";
import { PAYMENT_STATUSES, recordPaymentStatus, logPaymentError } from "@/utils/paymentMonitoring";

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
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const stripeButtonInitialized = useRef(false);
  const formDataRef = useRef<DetailedSignupFormValues | null>(null);

  // Log payment processing errors to database
  const logStripePaymentError = async (error: string, context: Record<string, any>) => {
    console.error("Payment processing error:", error, context);
    
    setPaymentError(error);
    
    if (userId) {
      await logPaymentError({
        userId: userId,
        errorType: 'stripe_payment_error',
        errorMessage: error,
        context: context
      });
    }
  };

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
        
        // Record successful initialization in database
        recordPaymentStatus(supabaseUuid, PAYMENT_STATUSES.INITIALIZED);
        
      } catch (error) {
        console.error("Error updating Stripe button:", error);
        setPaymentError("Failed to initialize payment form. Please try again.");
        logStripePaymentError("Stripe button initialization failed", { 
          userId: supabaseUuid, 
          error: error instanceof Error ? error.message : String(error)
        });
      }
    } else {
      const errorMsg = "Could not find stripe-buy-button element";
      console.error(errorMsg);
      setPaymentError("Payment form could not be loaded. Please refresh the page and try again.");
      logStripePaymentError(errorMsg, { userId: supabaseUuid });
    }
  };

  const handleDetailsSubmit = async (data: DetailedSignupFormValues) => {
    console.log("Modal - Submitting form with data:", data);
    console.log("Modal - Plan ID:", planId);
    setIsSubmitting(true);
    setPaymentError(null);
    formDataRef.current = data; // Store form data for later use

    try {
      // Create the insertion object with all necessary fields
      const insertData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        student_name: data.studentName || "",
        phone: data.phone,
        student_age: data.studentAge,
        primary_learning_difference: data.primaryLearningDifference || null,
        plan_type: planId
      };
      
      // Insert data into Supabase
      const { data: insertedData, error } = await supabase
        .from('beta_registrations')
        .insert(insertData)
        .select()
        .single();

      if (error) {
        console.error("Supabase insert error:", error);
        
        if (error.code === '23505') {
          throw new Error('This email has already been registered for the beta.');
        }
        
        throw new Error(`Failed to submit registration: ${error.message || 'Unknown error'}`);
      }

      console.log("Registration successful with inserted data:", insertedData);
      console.log("Modal - Submission result:", { success: true, data: insertedData });
      
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
      
      // Show success toast and navigate to confirmation page
      toast({
        title: "Registration successful!",
        description: "Thank you for joining our beta program.",
      });
      
      // Close modal and redirect to confirmation page
      onClose();
      navigate('/beta-confirmed', { 
        state: {
          firstName: data.firstName,
          studentFirstName: data.studentName?.split(' ')[0] || ''
        }
      });
      
    } catch (error) {
      console.error("Modal - Error during submission:", error);
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
        // When Stripe redirects back after successful payment
        console.log("Stripe payment completed successfully");
        recordPaymentStatus(userId, PAYMENT_STATUSES.COMPLETED);
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
          <BetaSignupForm 
            onSubmit={handleDetailsSubmit}
            onCancel={onClose}
            isSubmitting={isSubmitting}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
