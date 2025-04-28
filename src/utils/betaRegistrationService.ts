
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { RegistrationFormValues } from "@/utils/formSchemas";
import { Database } from "@/integrations/supabase/types";

// Define a type for the beta_registrations table
type BetaRegistration = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  student_name: string | null;
  phone: string;
  student_age: string;
  primary_learning_difference: Database["public"]["Enums"]["learning_difference"] | null;
  plan_type: string;
  payment_id?: string;
  payment_status?: string;
  created_at?: string;
  updated_at?: string;
}

export const checkAvailableSpots = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('beta_registrations')
      .select('*', { count: 'exact', head: true });
    
    if (error) {
      console.error("Error checking available spots:", error);
      throw error;
    }
    
    // Calculate remaining spots (out of 200)
    const totalSpots = 200;
    const takenSpots = count || 0;
    const remainingSpots = Math.max(0, totalSpots - takenSpots);
    
    return remainingSpots;
  } catch (error) {
    console.error("Error in checkAvailableSpots:", error);
    return 0; // Default to 0 available spots on error
  }
};

export const submitBetaRegistration = async (
  data: RegistrationFormValues, 
  planType: string,
  paymentId?: string
) => {
  try {
    console.group("Beta Registration Service");
    console.log("Submitting beta registration:", { data, planType, paymentId });
    
    // Check if we still have spots available
    const availableSpots = await checkAvailableSpots();
    if (availableSpots <= 0) {
      throw new Error("All beta spots have been filled. Please join our waitlist instead.");
    }
    
    // Validate the input data
    if (!data.firstName || !data.lastName || !data.email || !planType) {
      console.error("Missing required fields:", { 
        firstName: data.firstName, 
        lastName: data.lastName, 
        email: data.email, 
        planType 
      });
      throw new Error('Missing required fields for registration');
    }
    
    // Create the insertion object with all necessary fields
    const insertData: BetaRegistration = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      student_name: data.studentName || null,
      phone: data.phone,
      student_age: data.studentAge,
      primary_learning_difference: data.primaryLearningDifference || null,
      plan_type: planType,
      payment_id: paymentId,
      payment_status: paymentId ? "paid" : "pending"
    };
    
    console.log("Insertion data to be sent to Supabase:", insertData);
    
    // Ensure we are using the exact table name that exists in Supabase
    const { data: insertedData, error } = await supabase
      .from('beta_registrations')
      .insert(insertData)
      .select()
      .single();

    if (error) {
      console.error("Supabase insert error:", error);
      
      // Additional logging to help debug the issue
      console.log("Error code:", error.code);
      console.log("Error message:", error.message);
      console.log("Error details:", error.details);
      
      if (error.code === '23505') {
        throw new Error('This email has already been registered for the beta.');
      }
      
      throw new Error(`Failed to submit registration: ${error.message || 'Unknown error'}`);
    }

    console.log("Registration successful with inserted data:", insertedData);
    console.groupEnd();
    
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Error submitting beta registration:', error);
    console.groupEnd();
    throw error;
  }
};
