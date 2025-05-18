
import { Helmet } from "react-helmet-async";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { HelmetProvider } from "react-helmet-async";

const Onboarding = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Complete Your Setup | Tobey's Tutor</title>
        <meta name="description" content="Complete your account setup to get started with Tobey's Tutor, the AI learning assistant for bright kids with dyslexia and ADHD." />
      </Helmet>
      
      <Alert className="max-w-4xl mx-auto mt-6 bg-blue-50 border-blue-200">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-700">
          Testing Mode: Click "Show Test Controls" to navigate between onboarding steps.
        </AlertDescription>
      </Alert>
      
      <OnboardingContainer />
    </HelmetProvider>
  );
};

export default Onboarding;
