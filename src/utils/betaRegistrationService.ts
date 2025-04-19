
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/use-toast";
import { RegistrationFormValues } from "@/utils/formSchemas";

export const submitBetaRegistration = async (data: RegistrationFormValues, planType: string) => {
  try {
    const { error } = await supabase
      .from('beta_registrations')
      .insert({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        student_name: data.studentName || null,
        plan_type: planType
      });

    if (error) {
      if (error.code === '23505') {
        throw new Error('This email has already been registered for the beta.');
      }
      throw error;
    }

    return { success: true };
  } catch (error) {
    console.error('Error submitting beta registration:', error);
    throw error;
  }
};
