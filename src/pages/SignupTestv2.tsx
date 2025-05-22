
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { InputField, SelectField } from "@/components/form/FormField";

// Create a mock schema for the form
const mockSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  studentName: z.string(),
  studentAge: z.string(),
  primaryLearningDifference: z.string().optional(),
});

type MockSignupFormValues = z.infer<typeof mockSignupSchema>;

// Age options for students (8-16 years)
const studentAgeOptions = Array.from({ length: 9 }, (_, i) => {
  const age = i + 8;
  return { value: age.toString(), label: `${age} years` };
});

// Learning difference options
const learningDifferenceOptions = [
  { value: "ADHD", label: "ADHD" },
  { value: "Dyslexia", label: "Dyslexia" },
  { value: "Dyscalculia", label: "Dyscalculia" },
  { value: "Auditory Processing", label: "Auditory Processing" },
  { value: "Executive_Functioning", label: "Executive Function" },
  { value: "Other", label: "Other" },
];

const SignupTestv2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const form = useForm<MockSignupFormValues>({
    resolver: zodResolver(mockSignupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentName: "",
      studentAge: "",
      primaryLearningDifference: undefined,
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    // Navigate back to homepage when modal is closed
    navigate("/");
  };

  const handleSubmit = async (data: MockSignupFormValues) => {
    setIsSubmitting(true);
    console.log("Form data submitted (no backend):", data);
    
    // Simulate a delay and then show payment section
    setTimeout(() => {
      setFormSubmitted(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset when closing
      setFormSubmitted(false);
      setIsSubmitting(false);
      closeModal();
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Dialog open={isModalOpen} onOpenChange={handleOpenChange}>
        <DialogContent className={`sm:max-w-md md:max-w-xl ${isMobile ? 'h-[calc(100vh-4rem)] max-h-full mt-16 pt-6' : ''}`}>
          <DialogHeader className={isMobile ? 'pb-2' : ''}>
            <DialogTitle className="text-2xl font-medium">Reserve Your Spot for $1</DialogTitle>
            <DialogDescription>
              Join our founding community of 200 families. Complete the form below to secure your place.
            </DialogDescription>
          </DialogHeader>
          
          <div className={isMobile ? 'overflow-y-auto max-h-[calc(100vh-12rem)] pb-4' : ''}>
            {!formSubmitted ? (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      control={form.control}
                      name="firstName"
                      label="First Name"
                      placeholder="Your first name"
                    />
                    
                    <InputField
                      control={form.control}
                      name="lastName"
                      label="Last Name"
                      placeholder="Your last name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      control={form.control}
                      name="email"
                      label="Email Address"
                      placeholder="your.email@example.com"
                      type="email"
                    />
                    
                    <InputField
                      control={form.control}
                      name="phone"
                      label="Phone Number"
                      placeholder="(555) 123-4567"
                      type="tel"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField
                      control={form.control}
                      name="studentName"
                      label="Student's Name"
                      placeholder="Student's name"
                    />
                    
                    <SelectField
                      control={form.control}
                      name="studentAge"
                      label="Student's Age"
                      placeholder="Select age"
                      options={studentAgeOptions}
                    />
                  </div>
                  
                  <SelectField
                    control={form.control}
                    name="primaryLearningDifference"
                    label="Primary Learning Difference"
                    placeholder="Select if applicable"
                    options={learningDifferenceOptions}
                    optional={true}
                  />
                  
                  <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={closeModal} className="mr-2">
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={isSubmitting}
                      className="bg-tobey-orange hover:bg-tobey-orange/90 text-white"
                    >
                      {isSubmitting ? "Submitting..." : "Reserve Your Spot for $1"}
                    </Button>
                  </div>
                </form>
              </Form>
            ) : (
              <div className="py-6 text-center">
                <div className="mb-6">
                  <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
                    <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-medium mb-2">Registration Complete!</h3>
                  <p className="text-gray-600 mb-6">
                    Complete your payment to secure your spot in our beta program.
                  </p>
                </div>

                <div id="payment-button-container" className="flex justify-center mb-4">
                  {/* Mock Stripe button - no actual Stripe integration */}
                  <Button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg font-medium"
                    onClick={() => {
                      console.log("Mock payment button clicked - no actual payment processed");
                      alert("This is a frontend-only demo. No payment will be processed.");
                    }}
                  >
                    Pay $1 to Reserve Your Spot
                  </Button>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignupTestv2;
