
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

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
}

const BetaSignupModal = ({ isOpen, onClose, planId }: BetaSignupModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);

  // Function to update the Stripe Button with the Supabase UUID
  const updateStripeButton = (supabaseUuid: string) => {
    const stripeButton = document.querySelector('stripe-buy-button');
    if (stripeButton) {
      stripeButton.setAttribute('client-reference-id', supabaseUuid);
      
      // Show the payment container
      const paymentContainer = document.getElementById('payment-button-container');
      if (paymentContainer) {
        paymentContainer.style.display = 'block';
      }
      
      console.log("Stripe button updated with client-reference-id:", supabaseUuid);
    } else {
      console.error("Could not find stripe-buy-button element");
    }
  };

  const handleDetailsSubmit = async (data: DetailedSignupFormValues) => {
    console.log("Modal - Form data:", data);
    setIsSubmitting(true);

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
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`sm:max-w-md md:max-w-xl ${isMobile ? 'h-[calc(100vh-4rem)] max-h-full mt-16 pt-6' : ''}`}>
        <DialogHeader className={isMobile ? 'pb-2' : ''}>
          <DialogTitle className="text-2xl font-medium">Reserve Your Spot</DialogTitle>
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
                  client-reference-id="[SUPABASE_UUID_PLACEHOLDER]">
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
