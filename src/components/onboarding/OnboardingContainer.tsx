
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import OnboardingLayout from "./OnboardingLayout";
import ProfileForm from "./ProfileForm";
import LearningDifferencesForm from "./LearningDifferencesForm";
import PaymentForm from "./PaymentForm";
import CompletionPage from "./CompletionPage";
import { OnboardingFormValues, OnboardingStep, LearningDifference } from "./types";
import { Button } from "@/components/ui/button";

interface OnboardingContainerProps {
  studentId?: string; // This would be passed once the user creates an account
}

const OnboardingContainer = ({ studentId = "temp-id" }: OnboardingContainerProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentStep, setCurrentStep] = useState<OnboardingStep>("profile");
  const [formData, setFormData] = useState<Partial<OnboardingFormValues>>({});
  const [paymentId, setPaymentId] = useState<string | null>(null);
  const [showDevControls, setShowDevControls] = useState(false);

  // On component mount, try to load any existing form data from localStorage
  useEffect(() => {
    const email = localStorage.getItem('user_email');
    const firstName = localStorage.getItem('user_first_name');
    const lastName = localStorage.getItem('user_last_name');
    const signupId = localStorage.getItem('signup_id');
    
    console.log("Loading saved data from localStorage:", { email, firstName, lastName, signupId });
    
    if (email || firstName || lastName) {
      setFormData(prev => ({
        ...prev,
        email: email || prev.email,
        firstName: firstName || prev.firstName,
        lastName: lastName || prev.lastName
      }));
    }
  }, []);

  // Check for 'step' URL parameter on component mount and when location changes
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const stepParam = urlParams.get('step');
    const sessionId = urlParams.get('session_id');
    
    // If there's a session_id, we're returning from Stripe payment
    if (sessionId) {
      setCurrentStep("complete");
      return;
    }
    
    if (stepParam) {
      // Validate that the step is a valid onboarding step
      const isValidStep = ['profile', 'learning-differences', 'payment', 'complete'].includes(stepParam);
      if (isValidStep) {
        setCurrentStep(stepParam as OnboardingStep);
      }
    }
  }, [location.search]);

  // Toggle dev controls
  const toggleDevControls = () => {
    setShowDevControls(prev => !prev);
  };

  // Navigate to a specific step
  const navigateToStep = (step: OnboardingStep) => {
    setCurrentStep(step);
    // Update URL with the step (without page reload)
    navigate(`/onboarding?step=${step}`, { replace: true });
  };

  // Profile step handler
  const handleProfileSubmit = (profileData: Partial<OnboardingFormValues>) => {
    // Store form data in component state AND localStorage
    setFormData(prev => ({ ...prev, ...profileData }));
    
    // Store user data in localStorage for persistence is now handled in the ProfileForm component
    
    navigateToStep("learning-differences");
  };

  // Learning differences step handler
  const handleLearningDifferencesSubmit = (differences: LearningDifference[]) => {
    // Here we would typically save this data to the database
    // For now we just store it in the component state
    setFormData(prev => ({ ...prev, learningDifferences: differences }));
    
    // Update any signup_id record if needed
    const signupId = localStorage.getItem('signup_id');
    const userEmail = localStorage.getItem('user_email');
    
    if (signupId && userEmail) {
      // Optionally update the backend with the learning differences data
      fetch('https://hgpplvegqlvxwszlhzwc.supabase.co/functions/v1/update-learning-differences', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          signup_id: signupId,
          email: userEmail,
          learning_differences: differences
        })
      }).catch(err => {
        console.error("Failed to update learning differences:", err);
        // We don't block navigation on this error
      });
    }
    
    navigateToStep("payment");
  };

  // Payment step handler
  const handlePaymentComplete = (paymentId: string) => {
    setPaymentId(paymentId);
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
          onBack={() => navigateToStep("profile")}
        />
      )}

      {currentStep === "payment" && (
        <PaymentForm 
          onPaymentComplete={handlePaymentComplete}
          onBack={() => navigateToStep("learning-differences")}
        />
      )}

      {currentStep === "complete" && (
        <CompletionPage />
      )}
    </OnboardingLayout>
  );
};

export default OnboardingContainer;
