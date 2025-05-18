
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/form/FormField";
import { OnboardingFormValues } from "./types";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const profileSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  studentName: z.string().min(1, "Student's name is required"),
  studentAge: z.string().min(1, "Student's age is required"),
});

type ProfileFormValues = Pick<
  OnboardingFormValues, 
  "firstName" | "lastName" | "email" | "phone" | "studentName" | "studentAge"
>;

interface ProfileFormProps {
  defaultValues: Partial<ProfileFormValues>;
  onSubmit: (values: ProfileFormValues) => void;
}

const ProfileForm = ({ defaultValues, onSubmit }: ProfileFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      studentName: "",
      studentAge: "",
      ...defaultValues,
    },
  });

  // Updated function to save profile data to Supabase via Edge Function
  const saveProfileData = async (values: ProfileFormValues) => {
    try {
      setIsSubmitting(true);
      
      // Get the anon key for authorization
      const { data: { session } } = await supabase.auth.getSession();
      
      // Make the request with proper headers
      const response = await fetch('https://hgpplvegqlvxwszlhzwc.supabase.co/functions/v1/save-profile-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHBsdmVncWx2eHdzemxoendjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NzU2NDEsImV4cCI6MjA2MDM1MTY0MX0.yMqquc9J0EhBA7lS7c-vInK6NC00BqTt5gKjMt7jl4I'}`
        },
        body: JSON.stringify(values)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save profile data');
      }
      
      const data = await response.json();
      
      // Store the returned signup_id in localStorage
      if (data.signup_id) {
        localStorage.setItem('signup_id', data.signup_id);
        console.log('Saved signup_id to localStorage:', data.signup_id);
      }
      
      // Also store other useful data in localStorage
      localStorage.setItem('user_email', values.email);
      localStorage.setItem('user_name', `${values.firstName} ${values.lastName}`);
      
      return data;
    } catch (error) {
      console.error('Error saving profile data:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to save profile data. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (values: ProfileFormValues) => {
    try {
      // Save profile data to database
      await saveProfileData(values);
      
      // Call the original onSubmit function to proceed to next step
      onSubmit(values);
    } catch (error) {
      console.error('Error in form submission:', error);
      // Error is already handled and displayed in saveProfileData
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Parent Information</h2>
            <p className="mt-1 text-sm text-gray-500">
              Please provide your contact information so we can keep you updated about your child's progress.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
            
            <InputField
              control={form.control}
              name="email"
              label="Email Address"
              placeholder="you@example.com"
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
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-6">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Student Information</h2>
            <p className="mt-1 text-sm text-gray-500">
              Details about your child will help us personalize their learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <InputField
              control={form.control}
              name="studentName"
              label="Student's Name"
              placeholder="Student's name"
            />
            
            <InputField
              control={form.control}
              name="studentAge"
              label="Student's Age"
              placeholder="e.g., 10"
              type="text"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Continue to Learning Differences"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
