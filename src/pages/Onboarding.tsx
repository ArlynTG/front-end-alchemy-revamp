
import { Helmet } from "react-helmet-async";
import OnboardingContainer from "@/components/onboarding/OnboardingContainer";

const Onboarding = () => {
  return (
    <>
      <Helmet>
        <title>Complete Your Setup | Tobey's Tutor</title>
        <meta name="description" content="Complete your account setup to get started with Tobey's Tutor, the AI learning assistant for bright kids with dyslexia and ADHD." />
      </Helmet>
      
      <OnboardingContainer />
    </>
  );
};

export default Onboarding;
