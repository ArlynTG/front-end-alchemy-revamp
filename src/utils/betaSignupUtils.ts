
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { DetailedSignupFormValues } from "@/utils/formSchemas";
import { Database } from "@/integrations/supabase/types";
import { LearningDifference } from "@/components/onboarding/types";

// Define a type for the signup_data table
type SignupData = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  student_name: string;
  phone: string;
  student_age: string;
  learning_difference: Database["public"]["Enums"]["learning_difference"] | null;
  plan_type: string;
  created_at?: string;
  updated_at?: string;
}

export const submitBetaSignup = async (data: DetailedSignupFormValues, planType: string) => {
  console.log("Utils - Starting beta signup submission");
  console.log("Utils - Data received:", data);
  console.log("Utils - Plan type:", planType);
  
  try {
    // Validate the input data
    if (!data.firstName || !data.lastName || !data.email || !planType) {
      console.error("Utils - Missing required fields:", { 
        firstName: data.firstName, 
        lastName: data.lastName, 
        email: data.email, 
        planType 
      });
      throw new Error('Missing required fields for registration');
    }
    
    // Create the insertion object with all necessary fields
    const insertData: SignupData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      student_name: data.studentName || "",
      phone: data.phone,
      student_age: data.studentAge,
      learning_difference: data.primaryLearningDifference as Database["public"]["Enums"]["learning_difference"] || null,
      plan_type: planType
    };
    
    console.log("Utils - Insertion data for Supabase:", insertData);
    
    const { data: insertedData, error } = await supabase
      .from('signup_data')
      .insert(insertData)
      .select()
      .returns<Database["public"]["Tables"]["signup_data"]["Row"]>()
      .single();

    if (error) {
      console.error("Utils - Supabase insert error:", error);
      
      if (error.code === '23505') {
        throw new Error('This email has already been registered for the beta.');
      }
      
      throw new Error(`Failed to submit registration: ${error.message || 'Unknown error'}`);
    }

    console.log("Utils - Registration successful with inserted data:", insertedData);
    
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Utils - Error submitting beta signup:', error);
    throw error;
  }
};
