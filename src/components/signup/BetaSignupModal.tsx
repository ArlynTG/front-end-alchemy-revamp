
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useNavigate } from "react-router-dom";
import BetaSignupForm from "@/components/pricing/BetaSignupForm";
import { useIsMobile } from "@/hooks/use-mobile";
import { DetailedSignupFormValues } from "@/utils/formSchemas";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
}

const BetaSignupModal = ({ isOpen, onClose, planId }: BetaSignupModalProps) => {
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  // This handler is called for all modal close events
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // If the modal is closing, call the provided onClose handler
      onClose();
    }
  };

  // Updated to return a Promise to satisfy type requirements
  const handleSubmit = async (data: DetailedSignupFormValues): Promise<void> => {
    // This is a placeholder that returns a resolved promise
    return Promise.resolve();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`sm:max-w-md ${isMobile ? 'h-[90vh] max-h-full mt-16 pt-6' : ''}`}>
        <DialogHeader className={isMobile ? 'pb-2' : ''}>
          <DialogTitle className="text-2xl font-medium">Join Our Beta Program</DialogTitle>
          <DialogDescription>
            Complete this form to register for early access to our platform.
          </DialogDescription>
        </DialogHeader>
        
        <BetaSignupForm 
          onSubmit={handleSubmit}
          onCancel={onClose}
          isSubmitting={false}
        />
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
