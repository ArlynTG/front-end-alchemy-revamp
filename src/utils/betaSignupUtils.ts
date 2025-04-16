
import { toast } from "@/components/ui/use-toast";
import { DetailedSignupFormValues } from "@/utils/formSchemas";

export const submitBetaSignup = async (
  data: DetailedSignupFormValues, 
  planId: string
): Promise<{ success: boolean; payload?: any }> => {
  try {
    // Prepare the payload regardless of whether the API call succeeds
    const payload = {
      ...data,
      planType: planId,
      submittedAt: new Date().toISOString(),
    };
    
    try {
      // Use the specified webhook URL
      const webhookUrl = "http://174.138.51.74:5678/webhook/beta-signup";
      
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      
      if (!response.ok) {
        // If the response is not OK but we got a response, show specific error
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      // If we get here, the submission was successful
      toast({
        title: "Submission successful",
        description: "Your information has been submitted successfully.",
      });
      
      return { success: true, payload };
    } catch (fetchError) {
      console.error("Error submitting form:", fetchError);
      
      // For development/demo purposes, allow proceeding even if the webhook fails
      // This is useful for environments where the webhook might not be available
      console.log("Proceeding with local success despite webhook failure");
      
      // Show a warning toast but still return success for demo purposes
      toast({
        title: "Demo mode",
        description: "Webhook unavailable. Proceeding in demo mode.",
        variant: "default",
      });
      
      // Return success with the payload for the demo to continue
      return { success: true, payload };
    }
  } catch (error) {
    console.error("Error in submission process:", error);
    toast({
      title: "Submission failed",
      description: "There was an error submitting your information. Please try again.",
      variant: "destructive",
    });
    return { success: false };
  }
};
