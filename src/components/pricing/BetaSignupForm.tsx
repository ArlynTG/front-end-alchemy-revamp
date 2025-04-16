
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
} from "@/components/ui/form";
import { InputField, SelectField } from "@/components/form/FormField";

const formSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  studentName: z.string().min(1, "Student's name is required"),
  studentAge: z.string().min(1, "Student's age is required"),
  learningDifference: z.string().optional(),
});

export type BetaSignupFormValues = z.infer<typeof formSchema>;

interface BetaSignupFormProps {
  onSubmit: (data: BetaSignupFormValues) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

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

const BetaSignupForm = ({ onSubmit, onCancel, isSubmitting }: BetaSignupFormProps) => {
  const form = useForm<BetaSignupFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentName: "",
      studentAge: "",
      learningDifference: "",
    },
  });

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit} className="space-y-4 py-4">
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
            placeholder="Student's first name"
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
          name="learningDifference"
          label="Primary Learning Difference"
          placeholder="Select if applicable"
          options={learningDifferenceOptions}
          optional={true}
        />
        
        <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onCancel} className="mr-2">
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-tobey-orange hover:bg-tobey-orange/90 text-white"
          >
            {isSubmitting ? "Submitting..." : "Reserve Your Spot"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default BetaSignupForm;
