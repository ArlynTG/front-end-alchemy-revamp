
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField } from "@/components/form/FormField";
import { OnboardingFormValues } from "./types";

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
          <Button type="submit">
            Continue to Learning Differences
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default ProfileForm;
