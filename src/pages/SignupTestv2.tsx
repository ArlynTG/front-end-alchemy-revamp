
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
import { useEffect } from "react";

// Create a mock schema for the form
const mockSignupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  studentName: z.string(),
  studentAge: z.string(),
  learningDiff: z.string().optional(),
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
      learningDiff: undefined,
    },
  });

  const closeModal = () => {
    setIsModalOpen(false);
    // Navigate back to homepage when modal is closed
    navigate("/");
  };

  const handleSubmit = async (data: MockSignupFormValues) => {
    setIsSubmitting(true);
    console.log("Form data submitted:", data);
    
    // The actual form submission is handled by the script in useEffect
    // This function now only manages UI state
    setIsSubmitting(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset when closing
      setFormSubmitted(false);
      setIsSubmitting(false);
      closeModal();
    }
  };

  // Add the custom script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      /* 1️⃣  Supabase client */
      import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

      const supabase = createClient(
        "https://hgpplvegqlvxwszlhzwc.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHBsdmVncWx2eHdzemxoendjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NzU2NDEsImV4cCI6MjA2MDM1MTY0MX0.yMqquc9J0EhBA7lS7c-vInK6NC00BqTt5gKjMt7jl4I"
      );

      /* 2️⃣  Handle form submit */
      const form = document.getElementById("signup-form");
      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const row = {
          first_name:   form.firstName.value,
          last_name:    form.lastName.value,
          email:        form.email.value,
          phone:        form.phone.value,
          student_name: form.studentName.value,
          student_age:  form.studentAge.value,
          learning_difference: form.learningDiff.value || null,
          signup_status:  'submitted',
          billing_status: 'unpaid'
        };

        const { error } = await supabase.from("signup_data").insert([row]);
        if (error) {
          alert("Sorry—couldn't save your info. Please try again.");
          console.error(error);
          return;
        }

        /* 3️⃣  Launch Stripe Checkout */
        document.querySelector("stripe-buy-button").click();
      });
    `;
    document.body.appendChild(script);

    // Add Stripe script
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/buy-button.js';
    stripeScript.async = true;
    document.head.appendChild(stripeScript);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(stripeScript);
    };
  }, []);

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
            <Form {...form}>
              <form id="signup-form" onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 py-4">
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
                  name="learningDiff"
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

                {/* Hidden Stripe Buy Button */}
                <div style={{ display: 'none' }}>
                  <stripe-buy-button
                    buy-button-id="buy_btn_1RROv2BpB9LJmKwiJTDSTCPl"
                    publishable-key="pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu"
                  ></stripe-buy-button>
                </div>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignupTestv2;
