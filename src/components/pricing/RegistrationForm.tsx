
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/form/FormField";
import { registrationSchema, RegistrationFormValues } from "@/utils/formSchemas";
import { submitBetaRegistration } from "@/utils/betaRegistrationService";
import { toast } from "@/components/ui/use-toast";

interface RegistrationFormProps {
  selectedPlan: string;
}

const RegistrationForm = ({ selectedPlan }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      studentName: "",
      email: "",
    },
  });

  const handleSubmit = form.handleSubmit(async (data) => {
    setIsLoading(true);
    
    try {
      await submitBetaRegistration(data, selectedPlan);
      
      // Show success toast
      toast({
        title: "Registration successful!",
        description: "Thank you for joining our beta program.",
      });

      // Navigate to confirmation page with state data
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
