
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { RegistrationFormValues } from "@/utils/formSchemas";

export const submitBetaRegistration = async (data: RegistrationFormValues, planType: string) => {
  try {
    console.log("Submitting beta registration:", { data, planType });
    
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
    const insertData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      student_name: data.studentName || null,
      phone: data.phone,
      student_age: data.studentAge,
      primary_learning_difference: data.primaryLearningDifference || null,
      plan_type: planType
    };
    
    console.log("Insertion data to be sent to Supabase:", insertData);
    
    // Test the connection to Supabase with a simple query
    const { error: connectionError } = await supabase
      .from('beta_registrations' as any)
      .select('count')
      .limit(1);
      
    if (connectionError) {
      console.error("Supabase connection test failed:", connectionError);
      throw new Error(`Failed to connect to Supabase: ${connectionError.message}`);
    }
    
    // Perform the insert with detailed error handling
    const { error, data: insertedData } = await supabase
      .from('beta_registrations' as any)
      .insert(insertData as any)
      .select();

    if (error) {
      console.error("Supabase insert error:", error);
      
      if (error.code === '23505') {
        throw new Error('This email has already been registered for the beta.');
      }
      
      throw new Error(`Failed to submit registration: ${error.message || 'Unknown error'}`);
    }

    if (!insertedData || insertedData.length === 0) {
      console.warn("No data returned from successful insert");
    } else {
      console.log("Registration successful with inserted data:", insertedData);
    }
    
    return { success: true, data: insertedData };
  } catch (error) {
    console.error('Error submitting beta registration:', error);
    throw error;
  }
};
