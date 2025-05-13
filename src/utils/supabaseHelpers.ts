
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";

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
    // Format the data for Supabase
    const insertData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone || null,
      student_name: data.studentName || null,
      student_age: data.studentAge || null,
      learning_differences: data.primaryLearningDifference ? [data.primaryLearningDifference] : null,
      plan_type: data.planId
    };
    
    // Insert data into Supabase
    const { data: insertedData, error } = await supabase
      .from('beta_registrations')
      .insert(insertData)
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      
      if (error.code === '23505') {
        throw new Error('This email has already been registered for the beta.');
      }
      
      throw new Error(`Failed to submit registration: ${error.message || 'Unknown error'}`);
    }

    return { success: true, data: insertedData?.[0] || null };
    
  } catch (error) {
    console.error("Error in insertBetaRegistration:", error);
    throw error;
  }
};
