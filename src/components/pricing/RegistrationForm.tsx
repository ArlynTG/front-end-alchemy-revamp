
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/form/FormField";

interface RegistrationFormProps {
  selectedPlan: string;
}

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  studentFirstName: z.string().optional(),
  email: z.string().email("Please enter a valid email address"),
});

type RegistrationFormValues = z.infer<typeof formSchema>;

const RegistrationForm = ({ selectedPlan }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      studentFirstName: "",
      email: "",
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to confirmation page with state data
      navigate("/beta-confirmed", { 
        state: { 
          firstName: data.firstName, 
          lastName: data.lastName, 
          email: data.email, 
          studentFirstName: data.studentFirstName,
          planType: selectedPlan
        } 
      });
    }, 1000);
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
            name="studentFirstName"
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
