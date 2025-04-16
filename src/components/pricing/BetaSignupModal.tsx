
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
    
    const result = await submitBetaSignup(data, planId);
    
    if (result.success) {
      // Redirect to confirmation page with user data
      navigate("/beta-confirmed", { 
        state: { 
          firstName: data.firstName, 
          lastName: data.lastName, 
          email: data.email,
          studentFirstName: data.studentFirstName,
          planType: planId
        } 
      });
      
      // Close modal
      onClose();
    }
    
    setIsSubmitting(false);
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
