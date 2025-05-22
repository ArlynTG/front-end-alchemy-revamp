
import { Helmet } from "react-helmet-async";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import SuccessPage from "@/components/onboarding/SuccessPage";
import { HelmetProvider } from "react-helmet-async";

const OnboardingSuccess = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Payment Successful | Tobey's Tutor</title>
        <meta name="description" content="AI-enabled tutoring for dyslexic & ADHD students that boosts academic grades, skills and confidence." />
      </Helmet>
      
      <OnboardingLayout currentStep="payment">
        <SuccessPage />
      </OnboardingLayout>
    </HelmetProvider>
  );
};

export default OnboardingSuccess;
