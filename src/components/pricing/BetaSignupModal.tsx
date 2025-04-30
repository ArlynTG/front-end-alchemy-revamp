
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

// Configuration for monitoring
const MONITORING_CONFIG = {
  MAX_PAYMENT_FAILURES: 3,
  LOG_ERRORS_TO_DATABASE: true,
  ENABLE_FALLBACK_MECHANISM: true
};

// Track payment attempts and failures
const paymentStats = {
  attempts: 0,
  failures: 0,
  reset() {
    this.attempts = 0;
    this.failures = 0;
  }
};

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

  // Log payment processing errors to database
  const logPaymentError = async (error: string, context: Record<string, any>) => {
    console.error("Payment processing error:", error, context);
    
    if (MONITORING_CONFIG.LOG_ERRORS_TO_DATABASE && userId) {
      try {
        await supabase.from('payment_records').insert({
          registration_id: userId,
          payment_status: 'error',
          payment_method: 'stripe',
          payment_amount: 100, // $1.00
          stripe_customer_id: context.stripeCustomerId || null,
          stripe_payment_id: context.stripePaymentId || null
        });
      } catch (dbError) {
        console.error("Failed to log payment error to database:", dbError);
      }
    }
    
    // Update the payment stats
    paymentStats.failures++;
    
    // Notify if failures exceed threshold
    if (paymentStats.failures >= MONITORING_CONFIG.MAX_PAYMENT_FAILURES) {
      toast({
        title: "Multiple payment failures detected",
        description: "Please check your Stripe dashboard and payment integration.",
        variant: "destructive",
      });
      
      // Reset the counter after notification
      paymentStats.reset();
    }
  };

  // Function to update the Stripe Button with the Supabase UUID
  const updateStripeButton = (supabaseUuid: string) => {
    paymentStats.attempts++;
    stripeButtonInitialized.current = false;
    setPaymentError(null);
    
    const stripeButton = document.querySelector('stripe-buy-button');
    if (stripeButton) {
      try {
        // Set the client-reference-id attribute directly
        stripeButton.setAttribute('client-reference-id', supabaseUuid);
        
        // Also update the buy-button-id to ensure it includes the client reference ID
        const buyButtonId = stripeButton.getAttribute('buy-button-id');
        if (buyButtonId) {
          // This ensures the URL will have the client_reference_id parameter
          const stripeUrl = stripeButton.getAttribute('publishable-key') 
            ? `https://buy.stripe.com/${buyButtonId}?client_reference_id=${supabaseUuid}`
            : null;
          
          if (stripeUrl) {
            console.log("Updated Stripe URL with client_reference_id:", stripeUrl);
          }
        }
        
        // Show the payment container
        const paymentContainer = document.getElementById('payment-button-container');
        if (paymentContainer) {
          paymentContainer.style.display = 'block';
        }
        
        console.log("Stripe button updated with client-reference-id:", supabaseUuid);
        stripeButtonInitialized.current = true;
        
        // Record successful initialization in database
        recordPaymentAttempt(supabaseUuid, 'initialized');
        
      } catch (error) {
        console.error("Error updating Stripe button:", error);
        setPaymentError("Failed to initialize payment form. Please try again.");
        logPaymentError("Stripe button initialization failed", { 
          userId: supabaseUuid, 
          error: error instanceof Error ? error.message : String(error)
        });
        
        if (MONITORING_CONFIG.ENABLE_FALLBACK_MECHANISM) {
          console.log("Attempting fallback mechanism for payment initialization");
          setTimeout(() => attemptFallbackInitialization(supabaseUuid), 1000);
        }
      }
    } else {
      const errorMsg = "Could not find stripe-buy-button element";
      console.error(errorMsg);
      setPaymentError("Payment form could not be loaded. Please refresh the page and try again.");
      logPaymentError(errorMsg, { userId: supabaseUuid });
    }
  };

  // Fallback mechanism to retry initialization
  const attemptFallbackInitialization = (supabaseUuid: string) => {
    console.log("Running fallback initialization for Stripe button");
    
    // Force re-render the button
    const container = document.getElementById('payment-button-container');
    if (container && !stripeButtonInitialized.current) {
      container.innerHTML = ''; // Clear container
      
      // Re-create the button element
      const newButton = document.createElement('stripe-buy-button');
      newButton.setAttribute('buy-button-id', 'buy_btn_1RJ0FPBpB9LJmKwiQfros2F2');
      newButton.setAttribute('publishable-key', 'pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu');
      newButton.setAttribute('client-reference-id', supabaseUuid);
      
      container.appendChild(newButton);
      container.style.display = 'block';
      
      console.log("Fallback: Recreated Stripe button with client-reference-id:", supabaseUuid);
      recordPaymentAttempt(supabaseUuid, 'fallback-initialized');
    }
  };

  // Record payment attempt status in database
  const recordPaymentAttempt = async (userId: string, status: string) => {
    try {
      await supabase.from('payment_records').insert({
        registration_id: userId,
        payment_status: status,
        payment_method: 'stripe',
        payment_amount: 100, // $1.00
        payment_date: new Date().toISOString()
      });
      console.log(`Payment attempt recorded: ${status}`);
    } catch (error) {
      console.error("Failed to record payment attempt:", error);
    }
  };

  const handleDetailsSubmit = async (data: DetailedSignupFormValues) => {
    console.log("Modal - Form data:", data);
    setIsSubmitting(true);
    setPaymentError(null);

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
      
      // Get the UUID from the inserted data
      const newUserId = insertedData.id;
      setUserId(newUserId);
      
      // Set form as submitted to show payment button
      setFormSubmitted(true);
      setIsSubmitting(false);
      
      // Update the Stripe button with the Supabase UUID
      setTimeout(() => {
        updateStripeButton(newUserId);
      }, 100);
      
      toast({
        title: "Registration successful!",
        description: "Please complete your payment to secure your spot.",
      });
      
    } catch (error) {
      console.error("Error during registration:", error);
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
        recordPaymentAttempt(userId, 'completed');
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
            <div className="flex flex-col items-center text-center w-full">
              <div className="mb-6 text-center">
                <h3 className="text-lg font-medium mb-2">Almost there!</h3>
                <p className="text-muted-foreground">Complete your payment to secure your spot.</p>
              </div>
              
              {paymentError && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                  {paymentError}
                  <Button 
                    variant="link" 
                    className="text-red-600 underline pl-1 h-auto p-0"
                    onClick={() => userId && updateStripeButton(userId)}
                  >
                    Try again
                  </Button>
                </div>
              )}
              
              {/* Payment button container with enhanced centering styles */}
              <div 
                id="payment-button-container" 
                ref={containerRef} 
                style={{display: 'none'}} 
                className="w-full flex justify-center items-center mx-auto"
              >
                <stripe-buy-button
                  buy-button-id="buy_btn_1RJ0FPBpB9LJmKwiQfros2F2"
                  publishable-key="pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu"
                  client-reference-id={userId || undefined}>
                </stripe-buy-button>
              </div>
              
              <div className="mt-6 text-sm text-muted-foreground text-center">
                <p>Having trouble with payment? Try refreshing the page or contact support.</p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
