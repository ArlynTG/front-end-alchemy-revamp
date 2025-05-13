
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import FormField from "../signup/FormField";
import { insertBetaRegistration } from "@/utils/supabaseHelpers";

// Define the validation schema
const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number").optional(),
  studentName: z.string().optional(),
  studentAge: z.string().optional(),
  primaryLearningDifference: z.string().optional(),
});

type SignupFormValues = z.infer<typeof signupSchema>;

// Generate age options for dropdown (4-18 years)
const studentAgeOptions = Array.from({ length: 15 }, (_, i) => {
  const age = i + 4;
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

interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: string;
}

const BetaSignupModal: React.FC<BetaSignupModalProps> = ({ isOpen, onClose, planId = "early-adopter" }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  const form = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentName: "",
      studentAge: "",
      primaryLearningDifference: "",
    },
  });

  const handleSubmit = async (data: SignupFormValues) => {
    setIsSubmitting(true);
    
    try {
      // Use the helper function to insert data
      const result = await insertBetaRegistration({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        studentName: data.studentName,
        studentAge: data.studentAge,
        primaryLearningDifference: data.primaryLearningDifference,
        planId
      });

      if (result.success && result.data) {
        const newUserId = result.data.id;
        setUserId(newUserId);
      
        // Save confirmation data to localStorage to handle page transitions
        const confirmationData = {
          firstName: data.firstName,
          studentFirstName: data.studentName?.split(' ')[0] || '',
          email: data.email,
          registrationId: newUserId
        };
        localStorage.setItem('betaConfirmationData', JSON.stringify(confirmationData));
        
        // Show success state
        setFormSubmitted(true);
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToStripe = () => {
    // Redirect to Stripe checkout
    window.location.href = "https://buy.stripe.com/aEU29XbjrclwgO49AC";
  };

  // Reset form when modal is closed
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setFormSubmitted(false);
      setUserId(null);
      form.reset();
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-medium">Reserve Your Spot for $1</DialogTitle>
          <DialogDescription>
            Join our founding community of 200 families. Complete the form below to secure your place.
          </DialogDescription>
        </DialogHeader>
        
        {!formSubmitted ? (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  label="First Name"
                  placeholder="Your first name"
                  required
                />
                
                <FormField
                  control={form.control}
                  name="lastName"
                  label="Last Name"
                  placeholder="Your last name"
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  label="Email Address"
                  placeholder="your.email@example.com"
                  type="email"
                  required
                />
                
                <FormField
                  control={form.control}
                  name="phone"
                  label="Phone Number"
                  placeholder="(555) 123-4567"
                  type="tel"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="studentName"
                  label="Student's Name"
                  placeholder="Student's name"
                />
                
                <div className="space-y-2">
                  <label htmlFor="studentAge" className="text-sm font-medium">
                    Student's Age
                  </label>
                  <Select
                    onValueChange={(value) => form.setValue("studentAge", value)}
                    defaultValue={form.getValues("studentAge")}
                  >
                    <SelectTrigger id="studentAge" className="w-full">
                      <SelectValue placeholder="Select age" />
                    </SelectTrigger>
                    <SelectContent>
                      {studentAgeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="primaryLearningDifference" className="text-sm font-medium">
                  Primary Learning Difference (Optional)
                </label>
                <Select
                  onValueChange={(value) => form.setValue("primaryLearningDifference", value)}
                  defaultValue={form.getValues("primaryLearningDifference")}
                >
                  <SelectTrigger id="primaryLearningDifference" className="w-full">
                    <SelectValue placeholder="Select if applicable" />
                  </SelectTrigger>
                  <SelectContent>
                    {learningDifferenceOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-end pt-4">
                <Button variant="outline" onClick={onClose} className="mr-2">
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

            <div className="flex justify-center mb-4">
              <Button 
                onClick={redirectToStripe} 
                className="bg-tobey-orange hover:bg-tobey-orange/90 text-white px-6 py-3"
              >
                Pay $1 to Complete Registration
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
