
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { DetailedSignupFormValues } from "@/utils/formSchemas";
import { toast } from "@/components/ui/use-toast";
import StripePaymentElement from "../payment/StripePaymentElement";
import { Button } from "@/components/ui/button";
import BetaSignupForm from "./BetaSignupForm";
import { useIsMobile } from "@/hooks/use-mobile";

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId: string;
}

const BetaSignupModal = ({ isOpen, onClose, planId }: BetaSignupModalProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStep, setFormStep] = useState<'details' | 'payment'>('details');
  const [formData, setFormData] = useState<DetailedSignupFormValues | null>(null);
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const handleDetailsSubmit = async (data: DetailedSignupFormValues) => {
    console.log("Modal - Form data:", data);
    setFormData(data);
    setFormStep('payment');
  };

  const handlePaymentSuccess = async (paymentId: string) => {
    if (!formData) return;
    
    setIsSubmitting(true);
    
    try {
      console.log("Payment successful with ID:", paymentId);
      
      navigate("/beta-confirmed", { 
        state: { 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email, 
          studentName: formData.studentName,
          planType: planId,
          paymentId: paymentId
        } 
      });
      
      // Close modal
      onClose();
      
    } catch (error) {
      console.error("Error during registration completion:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackToDetails = () => {
    setFormStep('details');
  };

  // Reset form step when modal is closed or opened
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset to details step when closing
      setTimeout(() => setFormStep('details'), 300); // Delay to avoid visual glitch
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className={`sm:max-w-md md:max-w-xl ${isMobile ? 'h-[calc(100vh-4rem)] max-h-full mt-16 pt-6' : ''}`}>
        <DialogHeader className={isMobile ? 'pb-2' : ''}>
          <DialogTitle className="text-2xl font-medium">Reserve Your Spot</DialogTitle>
          <DialogDescription>
            Join our founding community of 200 families. Complete the form below to secure your place.
          </DialogDescription>
        </DialogHeader>
        
        <div className={isMobile ? 'overflow-y-auto max-h-[calc(100vh-12rem)] pb-4' : ''}>
          {formStep === 'details' ? (
            <BetaSignupForm 
              onSubmit={handleDetailsSubmit}
              onCancel={onClose}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="py-4">
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium mb-2">Your Information</h4>
                {formData && (
                  <>
                    <p className="text-sm text-gray-700">{formData.firstName} {formData.lastName}</p>
                    <p className="text-sm text-gray-700">{formData.email}</p>
                  </>
                )}
              </div>
              
              {formData && (
                <StripePaymentElement 
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  email={formData.email}
                  onPaymentSuccess={handlePaymentSuccess}
                />
              )}
              
              <Button
                variant="outline"
                className="w-full mt-4"
                onClick={handleBackToDetails}
                disabled={isSubmitting}
              >
                Back to Personal Details
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
