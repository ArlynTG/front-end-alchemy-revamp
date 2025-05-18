
import { ReactNode } from "react";
import { CheckCircle, Circle } from "lucide-react";
import { OnboardingStep } from "./types";

interface OnboardingLayoutProps {
  children: ReactNode;
  currentStep: OnboardingStep;
}

const steps: { id: OnboardingStep; title: string }[] = [
  { id: "profile", title: "Profile" },
  { id: "learning-differences", title: "Learning Differences" },
  { id: "payment", title: "Payment" },
  { id: "complete", title: "Complete" },
];

const OnboardingLayout = ({ children, currentStep }: OnboardingLayoutProps) => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to Tobey's Tutor</h1>
          <p className="mt-2 text-lg text-gray-600">Complete your account setup to get started</p>
        </div>

        <div className="mb-10">
          <nav aria-label="Progress">
            <ol role="list" className="space-y-4 md:flex md:space-y-0 md:space-x-8">
              {steps.map((step, index) => {
                const isCurrentStep = step.id === currentStep;
                const isCompleted = getStepIndex(currentStep) > index;

                return (
                  <li key={step.id} className="md:flex-1">
                    <div className="group flex flex-col border-l-4 border-gray-200 py-2 pl-4 md:border-l-0 md:border-t-4 md:pb-0 md:pl-0 md:pt-4">
                      <span className="flex items-center text-sm font-medium">
                        <span className="mr-2 flex h-5 w-5 flex-shrink-0 items-center justify-center">
                          {isCompleted ? (
                            <CheckCircle className="h-5 w-5 text-tobey-orange" />
                          ) : (
                            <Circle 
                              className={`h-5 w-5 ${isCurrentStep ? "text-tobey-orange" : "text-gray-300"}`}
                              fill={isCurrentStep ? "rgba(255, 106, 0, 0.1)" : "transparent"}
                            />
                          )}
                        </span>
                        <span
                          className={`
                            ${isCurrentStep ? "text-tobey-orange" : ""}
                            ${isCompleted ? "text-tobey-orange" : ""}
                            ${!isCompleted && !isCurrentStep ? "text-gray-500" : ""}
                          `}
                        >
                          {step.title}
                        </span>
                      </span>
                    </div>
                  </li>
                );
              })}
            </ol>
          </nav>
        </div>

        <div className="bg-white shadow rounded-lg p-6 md:p-8">
          {children}
        </div>
      </div>
    </div>
  );
};

// Helper function to get the step index
function getStepIndex(step: OnboardingStep): number {
  return steps.findIndex((s) => s.id === step);
}

export default OnboardingLayout;
