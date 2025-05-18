
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";
import ProfileForm from "./ProfileForm";
import LearningDifferencesForm from "./LearningDifferencesForm";
import PaymentForm from "./PaymentForm";
import DocumentUploadForm from "./DocumentUploadForm";
import CompletionPage from "./CompletionPage";
import { OnboardingFormValues, OnboardingStep, LearningDifference } from "./types";
import { Button } from "@/components/ui/button";

interface OnboardingContainerProps {
  studentId?: string; // This would be passed once the user creates an account
}

const OnboardingContainer = ({ studentId = "temp-id" }: OnboardingContainerProps) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("profile");
  const [formData, setFormData] = useState<Partial<OnboardingFormValues>>({});
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [showDevControls, setShowDevControls] = useState(false);

  // Toggle dev controls
  const toggleDevControls = () => {
    setShowDevControls(prev => !prev);
  };

  // Navigate to a specific step
  const navigateToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
  };

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
      {/* Development testing controls */}
      <div className="mb-6 text-right">
        <Button
          variant="outline"
          size="sm"
          onClick={toggleDevControls}
          className="text-xs bg-gray-100 hover:bg-gray-200"
        >
          {showDevControls ? "Hide Test Controls" : "Show Test Controls"}
        </Button>
      </div>

      {showDevControls && (
        <div className="bg-gray-50 border border-gray-200 rounded-md p-4 mb-6">
          <h3 className="text-sm font-medium mb-2">Testing Controls</h3>
          <p className="text-xs text-gray-500 mb-3">Skip to any step in the onboarding process for testing purposes.</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToStep("profile")}
              className={`text-xs ${currentStep === "profile" ? "bg-blue-100" : ""}`}
            >
              Profile
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToStep("learning-differences")}
              className={`text-xs ${currentStep === "learning-differences" ? "bg-blue-100" : ""}`}
            >
              Learning Differences
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToStep("payment")}
              className={`text-xs ${currentStep === "payment" ? "bg-blue-100" : ""}`}
            >
              Payment
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToStep("document-upload")}
              className={`text-xs ${currentStep === "document-upload" ? "bg-blue-100" : ""}`}
            >
              Document Upload
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => navigateToStep("complete")}
              className={`text-xs ${currentStep === "complete" ? "bg-blue-100" : ""}`}
            >
              Complete
            </Button>
          </div>
        </div>
      )}

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
