
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { InputField, SelectField } from "@/components/form/FormField";
import { registrationSchema, RegistrationFormValues } from "@/utils/formSchemas";
import { submitBetaRegistration, checkAvailableSpots } from "@/utils/betaRegistrationService";
import { toast } from "@/components/ui/use-toast";
import StripePaymentElement from "../payment/StripePaymentElement";

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

interface RegistrationFormProps {
  selectedPlan: string;
}

const RegistrationForm = ({ selectedPlan }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formStep, setFormStep] = useState<'details' | 'payment'>('details');
  const [availableSpots, setAvailableSpots] = useState<number | null>(null);
  const [formData, setFormData] = useState<RegistrationFormValues | null>(null);
  const navigate = useNavigate();
  
  // Get any stored signup data from localStorage
  const getStoredSignupData = () => {
    const storedData = localStorage.getItem("betaSignupData");
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (e) {
        console.error("Error parsing stored signup data:", e);
      }
    }
    return null;
  };
  
  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      studentName: "",
      email: "",
      phone: "",
      studentAge: "",
      primaryLearningDifference: undefined,
    },
  });

  // Pre-fill form with stored data if available
  useEffect(() => {
    const storedData = getStoredSignupData();
    if (storedData) {
      Object.keys(storedData).forEach(key => {
        // Only set form values for fields that exist and have values
        if (storedData[key]) {
          form.setValue(key as any, storedData[key]);
        }
      });
      
      // Clear the stored data after using it
      localStorage.removeItem("betaSignupData");
    }
  }, [form]);

  useEffect(() => {
    const fetchAvailableSpots = async () => {
      try {
        const spots = await checkAvailableSpots();
        setAvailableSpots(spots);
      } catch (error) {
        console.error("Error fetching available spots:", error);
        // Default to showing some spots available if there's an error
        setAvailableSpots(1);
      }
    };
    
    fetchAvailableSpots();
  }, []);

  const handleDetailsSubmit = form.handleSubmit((data) => {
    console.log("Form data submitted:", data);
    setFormData(data);
    setFormStep('payment');
  });

  const handlePaymentSuccess = async (paymentId: string) => {
    if (!formData) return;
    
    setIsLoading(true);
    
    try {
      console.group("Registration Form Submission");
      console.log("Form Data:", formData);
      console.log("Selected Plan:", selectedPlan);
      console.log("Payment ID:", paymentId);
      
      if (!selectedPlan) {
        console.error("No plan selected!");
        throw new Error("No plan selected. Please select a plan first.");
      }
      
      console.log("Attempting to submit registration...");
      const result = await submitBetaRegistration(formData, selectedPlan, paymentId);
      console.log("Registration result:", result);
      
      toast({
        title: "Registration successful!",
        description: "Thank you for joining our beta program.",
      });

      navigate("/beta-confirmed", { 
        state: { 
          firstName: formData.firstName, 
          lastName: formData.lastName, 
          email: formData.email, 
          studentName: formData.studentName,
          planType: selectedPlan,
          paymentId: paymentId
        } 
      });
    } catch (error) {
      console.error("Registration Error:", error);
      toast({
        title: "Registration failed",
        description: error instanceof Error ? error.message : "There was an error submitting your registration. Please try again.",
        variant: "destructive",
      });
    } finally {
      console.groupEnd();
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-medium mb-6">Complete Your Registration</h3>
      
      {availableSpots !== null && (
        <div className={`text-sm mb-4 p-2 rounded-md ${availableSpots < 20 ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
          <strong>{availableSpots}</strong> {availableSpots === 1 ? 'spot' : 'spots'} remaining out of 200
        </div>
      )}
      
      <p className="text-sm text-gray-600 mb-4">
        Selected plan: <span className="font-medium">{selectedPlan}</span>
      </p>
      
      {formStep === 'details' ? (
        <Form {...form}>
          <form onSubmit={handleDetailsSubmit} className="flex flex-col space-y-4">
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
              {isLoading ? "Processing..." : "Continue to Payment →"}
            </Button>
          </form>
        </Form>
      ) : (
        <>
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium mb-2">Your Information</h4>
            <p className="text-sm text-gray-700">{formData?.firstName} {formData?.lastName}</p>
            <p className="text-sm text-gray-700">{formData?.email}</p>
          </div>
          
          {formData && (
            <StripePaymentElement 
              firstName={formData.firstName}
              lastName={formData.lastName}
              email={formData.email}
              onPaymentSuccess={handlePaymentSuccess}
            />
          )}
          
          <Button 
            variant="outline"
            className="w-full mt-4"
            onClick={() => setFormStep('details')}
            disabled={isLoading}
          >
            Back to Personal Details
          </Button>
        </>
      )}
    </div>
  );
};

export default RegistrationForm;
