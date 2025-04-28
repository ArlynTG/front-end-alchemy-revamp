
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registrationSchema, RegistrationFormValues } from "@/utils/formSchemas";

export const useRegistrationForm = () => {
  const [formStep, setFormStep] = useState<'details' | 'payment'>('details');
  const [formData, setFormData] = useState<RegistrationFormValues | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
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

  // Get any stored signup data from localStorage
  useEffect(() => {
    const storedData = localStorage.getItem("betaSignupData");
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        Object.keys(parsedData).forEach(key => {
          // Only set form values for fields that exist and have values
          if (parsedData[key]) {
            form.setValue(key as any, parsedData[key]);
          }
        });
        
        // Clear the stored data after using it
        localStorage.removeItem("betaSignupData");
      } catch (e) {
        console.error("Error parsing stored signup data:", e);
      }
    }
  }, [form]);

  const moveToPayment = (data: RegistrationFormValues) => {
    setFormData(data);
    setFormStep('payment');
  };

  const backToDetails = () => {
    setFormStep('details');
  };

  return {
    form,
    formStep,
    formData,
    isLoading,
    setIsLoading,
    moveToPayment,
    backToDetails
  };
};
