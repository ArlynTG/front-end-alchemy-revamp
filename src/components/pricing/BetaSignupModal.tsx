
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import BetaSignupForm from "./BetaSignupForm";
import { submitBetaSignup } from "@/utils/betaSignupUtils";
import { DetailedSignupFormValues } from "@/utils/formSchemas";
import { toast } from "@/components/ui/use-toast";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
}

const BetaSignupModal = ({ isOpen, onClose, planId }: BetaSignupModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (data: DetailedSignupFormValues) => {
    setIsSubmitting(true);
    console.log("Modal - Submitting form with data:", data);
    console.log("Modal - Plan ID:", planId);
    
    try {
      const result = await submitBetaSignup(data, planId);
      console.log("Modal - Submission result:", result);
      
      if (result.success) {
        toast({
          title: "Registration successful!",
          description: "Thank you for joining our beta program.",
        });
        
        // Redirect to confirmation page with user data
        navigate("/beta-confirmed", { 
          state: { 
            firstName: data.firstName, 
            lastName: data.lastName, 
            email: data.email,
            studentName: data.studentName,
            planType: planId
          } 
        });
        
        // Close modal
        onClose();
      } else {
        throw new Error("Unknown error occurred during submission");
      }
    } catch (error) {
      console.error("Modal - Error during submission:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Reserve Your Spot</DialogTitle>
          <DialogDescription>
            Join our founding community of 200 families. Complete the form below to secure your place.
          </DialogDescription>
        </DialogHeader>
        
        <BetaSignupForm 
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
