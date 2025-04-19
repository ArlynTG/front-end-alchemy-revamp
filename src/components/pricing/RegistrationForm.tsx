
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField, SelectField } from "@/components/form/FormField";
import { registrationSchema, RegistrationFormValues } from "@/utils/formSchemas";
import { submitBetaRegistration } from "@/utils/betaRegistrationService";
import { toast } from "@/components/ui/use-toast";

const studentAgeOptions = Array.from({ length: 18 }, (_, i) => {
  const age = i + 5;
  return { value: age.toString(), label: `${age} years` };
});

const learningDifferenceOptions = [
  { value: "Dyslexia", label: "Dyslexia" },
  { value: "ADHD", label: "ADHD" },
  { value: "Dysgraphia", label: "Dysgraphia" },
  { value: "Auditory Processing", label: "Auditory Processing" },
  { value: "Executive Function", label: "Executive Function" },
  { value: "Autism Spectrum", label: "Autism Spectrum" },
  { value: "Other", label: "Other" },
];

interface RegistrationFormProps {
  selectedPlan: string;
}

const RegistrationForm = ({ selectedPlan }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  console.log("RegistrationForm initializing with plan:", selectedPlan);
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      studentName: "",
      email: "",
      phone: "",
      studentAge: "",
      primaryLearningDifference: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    console.log("Form submitted with data:", data);
    console.log("Selected plan being sent to Supabase:", selectedPlan);
    
    try {
      if (!selectedPlan) {
        throw new Error("No plan selected. Please select a plan first.");
      }
      
      const result = await submitBetaRegistration(data, selectedPlan);
      console.log("Registration result:", result);
      
      toast({
        title: "Registration successful!",
        description: "Thank you for joining our beta program.",
      });

      navigate("/beta-confirmed", { 
        state: { 
          firstName: data.firstName, 
          lastName: data.lastName, 
          email: data.email, 
          studentName: data.studentName,
          planType: selectedPlan
        } 
      });
    } catch (error) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  });

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-medium mb-6">Complete Your Registration</h3>
      <p className="text-sm text-gray-600 mb-4">
        Selected plan: <span className="font-medium">{selectedPlan}</span>
      </p>
      <Form {...form}>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <InputField
            control={form.control}
            name="firstName"
            label="Your First Name"
            placeholder="Your First Name"
          />
          
          <InputField
            control={form.control}
            name="lastName"
            label="Last Name"
            placeholder="Last name"
          />
          
          <InputField
            control={form.control}
            name="studentName"
            label="Student's First Name (Optional)"
            placeholder="Student's First Name (Optional)"
          />
          
          <InputField
            control={form.control}
            name="email"
            label="Email Address"
            placeholder="Your email address"
            type="email"
          />

          <InputField
            control={form.control}
            name="phone"
            label="Phone Number"
            placeholder="(555) 123-4567"
            type="tel"
          />
          
          <SelectField
            control={form.control}
            name="studentAge"
            label="Student's Age"
            placeholder="Select age"
            options={studentAgeOptions}
          />
          
          <SelectField
            control={form.control}
            name="primaryLearningDifference"
            label="Primary Learning Difference"
            placeholder="Select if applicable"
            options={learningDifferenceOptions}
            optional={true}
          />
          
          <Button 
            type="submit"
            className="w-full btn-primary text-lg py-6"
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : "Reserve Your Spot →"}
          </Button>
          <p className="text-xs text-gray-500">
            Limited to 200 early adopters. Secure your spot now!
          </p>
        </form>
      </Form>
    </div>
  );
};

export default RegistrationForm;
