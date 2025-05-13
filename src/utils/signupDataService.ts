
import { supabase } from "@/integrations/supabase/client";

// The Stripe checkout URL
export const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/aEU29XbjrclwgO49AC";

// Interface for signup data
export interface SignupData {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  student_name?: string;
  student_age?: string;
  learning_difference?: string;
  plan_type?: string;
}

/**
 * Save signup data to localStorage as a backup
 */
export const saveToLocalStorage = (data: SignupData): void => {
  try {
    localStorage.setItem("signup_data_backup", JSON.stringify({
      ...data,
      timestamp: new Date().toISOString()
    }));
    console.log("Data saved to localStorage successfully");
  } catch (err) {
    console.error("Failed to save to localStorage:", err);
  }
};

/**
 * Submit signup data to the new signup_data table
 */
export const submitSignupData = async (data: SignupData): Promise<{success: boolean; error?: string}> => {
  try {
    // Save to localStorage first as backup
    saveToLocalStorage(data);
    
    // Submit to the new signup_data table
    const { error } = await supabase
      .from('signup_data')
      .insert(data);
    
    if (error) {
      console.error("Supabase insert error:", error);
      throw new Error(error.message);
    }
    
    console.log("Signup data saved successfully to signup_data table");
    return { success: true };
  } catch (error: any) {
    console.error("Error in submitSignupData:", error);
    return { success: false, error: error.message };
  }
};

/**
 * Redirect to Stripe checkout page
 */
export const redirectToStripeCheckout = (): void => {
  console.log("Redirecting to Stripe:", STRIPE_CHECKOUT_URL);
  window.location.href = STRIPE_CHECKOUT_URL;
};
