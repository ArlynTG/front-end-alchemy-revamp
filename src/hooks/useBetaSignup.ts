
import { useState } from "react";
import { DetailedSignupFormValues } from "@/utils/formSchemas";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

export const useBetaSignup = (planId: string) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const handleDetailsSubmit = async (data: DetailedSignupFormValues) => {
    console.log("Submitting form with data:", data);
    console.log("Plan ID:", planId);
    setIsSubmitting(true);
    setPaymentError(null);

    try {
      // Important: Store learning differences as an array in the database
      const learningDifferences = data.primaryLearningDifference ? [data.primaryLearningDifference] : null;
      
      // Create the insertion object with all necessary fields
      const insertData = {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        student_name: data.studentName || "",
        phone: data.phone,
        student_age: data.studentAge,
        learning_differences: learningDifferences,
        plan_type: planId
      };
      
      console.log("Insertion data being sent to Supabase:", insertData);
      
      // Insert data into Supabase
      const { data: insertedData, error } = await supabase
        .from('signup_data')
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
      setIsSubmitting(false);
      
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

  // Handle Stripe payment success event
  const setupStripeListener = () => {
    const handleStripeSuccess = async () => {
      console.log("Stripe payment completed successfully");
      
      // Update the user's signup status to 'paid'
      if (userId) {
        try {
          await supabase
            .from('signup_data')
            .update({ signup_status: 'paid' })
            .eq('id', userId);
            
          console.log("User payment status updated to paid");
        } catch (error) {
          console.error("Failed to update payment status:", error);
        }
      }
    };
    
    window.addEventListener('message', (event) => {
      if (event.data?.type === 'stripe-buy-button:transaction-complete') {
        handleStripeSuccess();
      }
    });
  };

  return {
    isSubmitting,
    formSubmitted,
    userId,
    paymentError,
    setPaymentError,
    handleDetailsSubmit,
    setupStripeListener
  };
};
