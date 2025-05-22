
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { Database } from "@/integrations/supabase/types";

/**
 * Helper function to insert beta registration data with error handling
 */
export const insertBetaRegistration = async (data: {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  studentName?: string;
  studentAge?: string;
  primaryLearningDifference?: string;
  planId: string;
}) => {
  try {
    console.log("Submitting registration data:", data);
    
    // Format the data for Supabase
    const insertData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      student_name: data.studentName || null,
      student_age: data.studentAge || null,
      learning_difference: data.primaryLearningDifference || null,
      plan_type: data.planId
    };
    
    console.log("Formatted data for insertion:", insertData);
    
    // Direct insert using Supabase client
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

    if (!insertedData) {
      throw new Error('Registration was submitted but returned no data');
    }

    console.log("Registration successful:", insertedData);
    return { success: true, data: insertedData };
    
  } catch (error) {
    console.error("Error in insertBetaRegistration:", error);
    throw error;
  }
};
