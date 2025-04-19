
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { RegistrationFormValues } from "@/utils/formSchemas";

export const submitBetaRegistration = async (data: RegistrationFormValues, planType: string) => {
  try {
    console.log("Submitting beta registration:", { data, planType });
    
    const { error, data: insertedData } = await supabase
      .from('beta_registrations')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        student_name: data.studentName || null,
        phone: data.phone,
        student_age: data.studentAge,
        primary_learning_difference: data.primaryLearningDifference || null,
        plan_type: planType
      })
      .select();

    if (error) {
      console.error("Supabase error:", error);
      
      if (error.code === '23505') {
        throw new Error('This email has already been registered for the beta.');
      }
      throw new Error(`Failed to submit registration: ${error.message}`);
    }

    console.log("Registration successful:", insertedData);
    return { success: true };
  } catch (error) {
    console.error('Error submitting beta registration:', error);
    throw error;
  }
};
