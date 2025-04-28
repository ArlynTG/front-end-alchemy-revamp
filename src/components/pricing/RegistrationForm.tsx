
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { submitBetaRegistration, checkAvailableSpots } from "@/utils/betaRegistrationService";
import { toast } from "@/components/ui/use-toast";
import { useRegistrationForm } from "@/hooks/useRegistrationForm";
import RegistrationDetailsForm from "./RegistrationDetailsForm";
import RegistrationPaymentForm from "./RegistrationPaymentForm";
import AvailableSpotsIndicator from "./AvailableSpotsIndicator";

interface RegistrationFormProps {
  selectedPlan: string;
}

const RegistrationForm = ({ selectedPlan }: RegistrationFormProps) => {
  const [availableSpots, setAvailableSpots] = useState<number | null>(null);
  const navigate = useNavigate();
  const {
    form,
    formStep,
    formData,
    isLoading,
    setIsLoading,
    moveToPayment,
    backToDetails
  } = useRegistrationForm();

  useEffect(() => {
    const fetchAvailableSpots = async () => {
      try {
        const spots = await checkAvailableSpots();
        setAvailableSpots(spots);
      } catch (error) {
        console.error("Error fetching available spots:", error);
        // Default to showing some spots available if there's an error
        setAvailableSpots(1);
      }
    };
    
    fetchAvailableSpots();
  }, []);

  const handleDetailsSubmit = form.handleSubmit((data) => {
    console.log("Form data submitted:", data);
    moveToPayment(data);
  });

  const handlePaymentSuccess = async (paymentId: string) => {
    if (!formData) return;
    
    setIsLoading(true);
    
    try {
      console.group("Registration Form Submission");
      console.log("Form Data:", formData);
      console.log("Selected Plan:", selectedPlan);
      console.log("Payment ID:", paymentId);
      
      if (!selectedPlan) {
        console.error("No plan selected!");
        throw new Error("No plan selected. Please select a plan first.");
      }
      
      console.log("Attempting to submit registration...");
      const result = await submitBetaRegistration(formData, selectedPlan, paymentId);
      console.log("Registration result:", result);
      
      toast({
        title: "Registration successful!",
        description: "Thank you for joining our beta program.",
      });

      navigate("/beta-confirmed", { 
        state: { 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email, 
          studentName: formData.studentName,
          planType: selectedPlan,
          paymentId: paymentId
        } 
      });
    } catch (error) {
      console.error("Registration Error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.groupEnd();
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-medium mb-6">Complete Your Registration</h3>
      
      <AvailableSpotsIndicator availableSpots={availableSpots} />
      
      <p className="text-sm text-gray-600 mb-4">
        Selected plan: <span className="font-medium">{selectedPlan}</span>
      </p>
      
      {formStep === 'details' ? (
        <RegistrationDetailsForm
          control={form.control}
          handleSubmit={handleDetailsSubmit}
          isLoading={isLoading}
        />
      ) : (
        formData && (
          <RegistrationPaymentForm
            formData={formData}
            onPaymentSuccess={handlePaymentSuccess}
            onBackToDetails={backToDetails}
            isLoading={isLoading}
          />
        )
      )}
    </div>
  );
};

export default RegistrationForm;
