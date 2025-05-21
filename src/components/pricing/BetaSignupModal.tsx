
import { useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import BetaSignupForm from "./BetaSignupForm";
import BetaPaymentSection from "./BetaPaymentSection";
import { useBetaSignup } from "@/hooks/useBetaSignup";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
}

const BetaSignupModal = ({ isOpen, onClose, planId }: BetaSignupModalProps) => {
  const isMobile = useIsMobile();
  const {
    isSubmitting,
    formSubmitted,
    userId,
    paymentError,
    setPaymentError,
    handleDetailsSubmit,
    setupStripeListener
  } = useBetaSignup(planId);

  // Reset form when modal is closed or opened
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Close modal
      onClose();
    }
  };

  // Add Stripe payment listener
  useEffect(() => {
    if (formSubmitted && userId) {
      setupStripeListener();
    }
  }, [formSubmitted, userId, setupStripeListener]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`sm:max-w-md md:max-w-xl ${isMobile ? 'h-[calc(100vh-4rem)] max-h-full mt-16 pt-6' : ''}`}>
        <DialogHeader className={isMobile ? 'pb-2' : ''}>
          <DialogTitle className="text-2xl font-medium">Reserve Your Spot for $1</DialogTitle>
          <DialogDescription>
            Join our founding community of 200 families. Complete the form below to secure your place.
          </DialogDescription>
        </DialogHeader>
        
        <div className={isMobile ? 'overflow-y-auto max-h-[calc(100vh-12rem)] pb-4' : ''}>
          {!formSubmitted ? (
            <BetaSignupForm 
              onSubmit={handleDetailsSubmit}
              onCancel={onClose}
              isSubmitting={isSubmitting}
            />
          ) : (
            <BetaPaymentSection 
              userId={userId}
              paymentError={paymentError}
              setPaymentError={setPaymentError}
            />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
