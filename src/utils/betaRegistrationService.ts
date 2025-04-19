
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { RegistrationFormValues } from "@/utils/formSchemas";

// Define a type for the beta_registrations table
type BetaRegistration = {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  student_name: string | null;
  phone: string;
  student_age: string;
  primary_learning_difference: string | null;
  plan_type: string;
  created_at?: string;
  updated_at?: string;
}

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
    
    // Validate student age is within the allowed range
    const validStudentAges = ['8', '9', '10', '11', '12', '13', '14', '15', '16'];
    if (!validStudentAges.includes(data.studentAge)) {
      throw new Error('Student age must be between 8 and 16');
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
      plan_type: planType
    };
    
    console.log("Insertion data to be sent to Supabase:", insertData);
    
    // Use a different approach to bypass the TypeScript errors
    // Cast the response directly without casting the method calls
    const response = await supabase
      .from('beta_registrations')
      .insert(insertData)
      .select();
      
    // Cast the response after receiving it
    const result = response as unknown as {
      error: { code?: string, message?: string } | null;
      data: any[] | null;
    };

    if (result.error) {
      console.error("Supabase insert error:", result.error);
      
      if (result.error.code === '23505') {
        throw new Error('This email has already been registered for the beta.');
      }
      
      throw new Error(`Failed to submit registration: ${result.error.message || 'Unknown error'}`);
    }

    console.log("Registration successful with inserted data:", result.data);
    
    return { success: true, data: result.data };
  } catch (error) {
    console.error('Error submitting beta registration:', error);
    throw error;
  }
};
