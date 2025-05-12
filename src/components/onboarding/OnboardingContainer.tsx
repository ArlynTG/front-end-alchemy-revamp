
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";
import ProfileForm from "./ProfileForm";
import LearningDifferencesForm from "./LearningDifferencesForm";
import PaymentForm from "./PaymentForm";
import DocumentUploadForm from "./DocumentUploadForm";
import CompletionPage from "./CompletionPage";
import { OnboardingFormValues, OnboardingStep, LearningDifference } from "./types";

interface OnboardingContainerProps {
  studentId?: string; // This would be passed once the user creates an account
}

const OnboardingContainer = ({ studentId = "temp-id" }: OnboardingContainerProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("profile");
  const [formData, setFormData] = useState<Partial<OnboardingFormValues>>({});
  const [paymentId, setPaymentId] = useState<string | null>(null);

  // Profile step handler
  const handleProfileSubmit = (profileData: Partial<OnboardingFormValues>) => {
    setFormData(prev => ({ ...prev, ...profileData }));
    setCurrentStep("learning-differences");
  };

  // Learning differences step handler
  const handleLearningDifferencesSubmit = (differences: LearningDifference[]) => {
    setFormData(prev => ({ ...prev, learningDifferences: differences }));
    setCurrentStep("payment");
  };

  // Payment step handler
  const handlePaymentComplete = (paymentId: string) => {
    setPaymentId(paymentId);
    setCurrentStep("document-upload");
  };

  // Document upload step handler
  const handleDocumentUploadComplete = () => {
    // Here you would typically store all the collected data in the database
    console.log("Onboarding complete with data:", { ...formData, paymentId });
    setCurrentStep("complete");
  };

  return (
    <OnboardingLayout currentStep={currentStep}>
      {currentStep === "profile" && (
        <ProfileForm 
          defaultValues={formData} 
          onSubmit={handleProfileSubmit} 
        />
      )}

      {currentStep === "learning-differences" && (
        <LearningDifferencesForm 
          selectedDifferences={formData.learningDifferences || []} 
          onSubmit={handleLearningDifferencesSubmit}
          onBack={() => setCurrentStep("profile")}
        />
      )}

      {currentStep === "payment" && (
        <PaymentForm 
          onPaymentComplete={handlePaymentComplete}
          onBack={() => setCurrentStep("learning-differences")}
        />
      )}

      {currentStep === "document-upload" && (
        <DocumentUploadForm 
          studentId={studentId}
          onComplete={handleDocumentUploadComplete}
          onBack={() => setCurrentStep("payment")}
        />
      )}

      {currentStep === "complete" && (
        <CompletionPage />
      )}
    </OnboardingLayout>
  );
};

export default OnboardingContainer;
