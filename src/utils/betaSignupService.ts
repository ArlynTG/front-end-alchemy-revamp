import { supabase } from "@/integrations/supabase/client";

// The Stripe checkout URL - updated to reference the new buy button
export const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/aFabJ04YV1L80uA9Zl9bO04";

interface BetaSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  studentName?: string;
  studentAge?: string;
  learningDifference?: string;
  planId: string;
}

/**
 * Save beta registration data to localStorage as a backup
 */
export const saveBetaSignupToLocalStorage = (data: BetaSignupData): void => {
  try {
    localStorage.setItem("beta_signup_data", JSON.stringify({
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      student_name: data.studentName,
      student_age: data.studentAge,
      learning_differences: data.learningDifference ? [data.learningDifference] : [],
      plan_type: data.planId,
      timestamp: new Date().toISOString()
    }));
    console.log("Data saved to localStorage successfully");
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
};

/**
 * Submit beta registration data to Supabase and return response
 */
export const submitBetaSignup = async (data: BetaSignupData): Promise<{success: boolean; error?: string}> => {
  try {
    // First save to localStorage as backup
    saveBetaSignupToLocalStorage(data);
    
    // Format the data for Supabase
    const registrationData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      student_name: data.studentName || null,
      student_age: data.studentAge || null,
      learning_differences: data.learningDifference ? [data.learningDifference] : [],
      plan_type: data.planId
    };
    
    console.log("Submitting registration data:", registrationData);
    
    // Insert data into Supabase
    const { error } = await supabase
      .from('beta_registrations')
      .insert(registrationData);
    
    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(error.message);
    }
    
    return { success: true };
  } catch (error: any) {
    console.error("Error in submitBetaSignup:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Redirect to Stripe checkout page
 */
export const redirectToStripeCheckout = (clientReferenceId?: string): void => {
  const url = new URL(STRIPE_CHECKOUT_URL);
  
  // Add the client reference ID as a parameter if provided
  if (clientReferenceId) {
    url.searchParams.append('client_reference_id', clientReferenceId);
  }
  
  console.log("Redirecting to Stripe:", url.toString());
  window.location.href = url.toString();
};
