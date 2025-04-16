
import { toast } from "@/components/ui/use-toast";
import { DetailedSignupFormValues } from "@/utils/formSchemas";

export const submitBetaSignup = async (
  data: DetailedSignupFormValues, 
  planId: string
): Promise<{ success: boolean; payload?: any }> => {
  try {
    // This would be replaced with your actual webhook URL
    const webhookUrl = "https://replace-with-your-n8n-url.com/webhook/beta-signup";
    
    const payload = {
      ...data,
      planType: planId,
      submittedAt: new Date().toISOString(),
    };
    
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    
    if (!response.ok) {
      throw new Error("Failed to submit form");
    }
    
    return { success: true, payload };
  } catch (error) {
    console.error("Error submitting form:", error);
    toast({
      title: "Submission failed",
      description: "There was an error submitting your information. Please try again.",
      variant: "destructive",
    });
    return { success: false };
  }
};
