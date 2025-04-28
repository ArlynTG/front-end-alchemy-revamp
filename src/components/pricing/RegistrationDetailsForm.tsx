
import { Control, UseFormHandleSubmit } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { InputField, SelectField } from "@/components/form/FormField";
import { RegistrationFormValues } from "@/utils/formSchemas";

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
  { value: "Other", label: "Other" },
];

interface RegistrationDetailsFormProps {
  control: Control<RegistrationFormValues>;
  handleSubmit: ReturnType<UseFormHandleSubmit<RegistrationFormValues>>;
  isLoading: boolean;
}

const RegistrationDetailsForm = ({
  control,
  handleSubmit,
  isLoading
}: RegistrationDetailsFormProps) => {
  return (
    <Form>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <InputField
          control={control}
          name="firstName"
          label="Your First Name"
          placeholder="Your First Name"
        />
        
        <InputField
          control={control}
          name="lastName"
          label="Last Name"
          placeholder="Last name"
        />
        
        <InputField
          control={control}
          name="studentName"
          label="Student's First Name (Optional)"
          placeholder="Student's First Name (Optional)"
        />
        
        <InputField
          control={control}
          name="email"
          label="Email Address"
          placeholder="Your email address"
          type="email"
        />

        <InputField
          control={control}
          name="phone"
          label="Phone Number"
          placeholder="(555) 123-4567"
          type="tel"
        />
        
        <SelectField
          control={control}
          name="studentAge"
          label="Student's Age"
          placeholder="Select age"
          options={studentAgeOptions}
        />
        
        <SelectField
          control={control}
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
          {isLoading ? "Processing..." : "Continue to Payment →"}
        </Button>
      </form>
    </Form>
  );
};

export default RegistrationDetailsForm;
