
import { Helmet } from "react-helmet-async";
import OnboardingLayout from "@/components/onboarding/OnboardingLayout";
import SuccessPage from "@/components/onboarding/SuccessPage";
import { HelmetProvider } from "react-helmet-async";

const OnboardingSuccess = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Payment Successful | Tobey's Tutor</title>
        <meta name="description" content="Your payment was successful. Welcome to Tobey's Tutor, the AI learning assistant for bright kids with dyslexia and ADHD." />
      </Helmet>
      
      <OnboardingLayout currentStep="payment">
        <SuccessPage />
      </OnboardingLayout>
    </HelmetProvider>
  );
};

export default OnboardingSuccess;
