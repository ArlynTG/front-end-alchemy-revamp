
import { Button } from "@/components/ui/button";
import StripePaymentElement from "../payment/StripePaymentElement";
import { RegistrationFormValues } from "@/utils/formSchemas";

interface RegistrationPaymentFormProps {
  formData: RegistrationFormValues;
  onPaymentSuccess: (paymentId: string) => void;
  onBackToDetails: () => void;
  isLoading: boolean;
}

const RegistrationPaymentForm = ({
  formData,
  onPaymentSuccess,
  onBackToDetails,
  isLoading
}: RegistrationPaymentFormProps) => {
  return (
    <>
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Your Information</h4>
        <p className="text-sm text-gray-700">{formData.firstName} {formData.lastName}</p>
        <p className="text-sm text-gray-700">{formData.email}</p>
      </div>
      
      <StripePaymentElement 
        firstName={formData.firstName}
        lastName={formData.lastName}
        email={formData.email}
        onPaymentSuccess={onPaymentSuccess}
      />
      
      <Button 
        variant="outline"
        className="w-full mt-4"
        onClick={onBackToDetails}
        disabled={isLoading}
      >
        Back to Personal Details
      </Button>
    </>
  );
};

export default RegistrationPaymentForm;
