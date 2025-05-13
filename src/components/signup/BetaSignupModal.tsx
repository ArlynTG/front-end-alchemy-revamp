import React, { useState, useEffect } from "react";
import { toast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog";
import { 
  submitSignupData,
  saveToLocalStorage
} from "@/utils/signupDataService";

// Define the modal props
interface BetaSignupModalProps {
  isOpen: boolean;
  onClose: () => void;
  planId?: string;
}

// Form field data types
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: string;
  learningDifference: string;
}

const BetaSignupModal: React.FC<BetaSignupModalProps> = ({ isOpen, onClose, planId = "early-adopter" }) => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    studentName: "",
    studentAge: "",
    learningDifference: ""
  });
  
  // Form validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Reset form when modal is closed
  useEffect(() => {
    if (!isOpen) {
      // Reset form when modal is closed
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        studentName: "",
        studentAge: "",
        learningDifference: ""
      });
      setErrors({});
      setIsSubmitting(false);
      setFormSubmitted(false);
    }
  }, [isOpen]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    // Required fields
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }
    
    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!validateForm()) {
      console.log("Form validation failed", errors);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Format data for the new signup_data table
      const signupData = {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone || null,
        student_name: formData.studentName || null,
        student_age: formData.studentAge || null,
        learning_difference: formData.learningDifference || null,
        plan_type: planId
      };

      console.log("Submitting signup data:", signupData);
      
      // Save to the new signup_data table
      await submitSignupData(signupData);
      
      toast({
        title: "Registration successful!",
        description: "Please complete your payment to secure your spot.",
      });
      
      // Show the Stripe button instead of redirecting
      setFormSubmitted(true);
      setIsSubmitting(false);
      
    } catch (error: any) {
      console.error("Error in form submission:", error);
      
      // Save to localStorage as backup if database submission fails
      saveToLocalStorage({
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        student_name: formData.studentName,
        student_age: formData.studentAge,
        learning_difference: formData.learningDifference,
        plan_type: planId
      });
      
      toast({
        title: "Registration Issue",
        description: "Your information was saved locally. Please continue to payment.",
        variant: "destructive",
      });
      
      // Show payment form even if there was an error
      setFormSubmitted(true);
      setIsSubmitting(false);
    }
  };

  // Learning difference options
  const learningDifferenceOptions = [
    { value: "ADHD", label: "ADHD" },
    { value: "Dyslexia", label: "Dyslexia" },
    { value: "Dyscalculia", label: "Dyscalculia" },
    { value: "Auditory_Processing", label: "Auditory Processing" },
    { value: "Executive_Functioning", label: "Executive Function" },
    { value: "Other", label: "Other" }
  ];

  // Generate age options for dropdown (8-16 years)
  const ageOptions = Array.from({ length: 9 }, (_, i) => {
    const age = i + 8;
    return { value: age.toString(), label: `${age} years` };
  });

  // Use the Dialog component to handle modal display and backdrop
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="w-full max-w-md p-6 bg-white rounded-lg shadow-xl overflow-y-auto max-h-[90vh] sm:max-h-[85vh]">
        <DialogHeader className="mb-4">
          <DialogTitle className="text-2xl font-bold text-gray-800">Reserve Your Spot for $1</DialogTitle>
          <DialogDescription className="text-gray-600">
            Join our founding community of 200 families. Complete the form below to secure your place.
          </DialogDescription>
        </DialogHeader>
        
        {!formSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name fields (side by side) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Your first name"
                  className={`w-full px-4 py-2 bg-blue-50 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors ${
                    errors.firstName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.firstName && (
                  <p className="mt-1 text-xs text-red-500">{errors.firstName}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Your last name"
                  className={`w-full px-4 py-2 bg-blue-50 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors ${
                    errors.lastName ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.lastName && (
                  <p className="mt-1 text-xs text-red-500">{errors.lastName}</p>
                )}
              </div>
            </div>
            
            {/* Email and Phone */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className={`w-full px-4 py-2 bg-blue-50 border rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-500">{errors.email}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors"
                />
              </div>
            </div>
            
            {/* Student Name and Age */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="studentName" className="block text-sm font-medium text-gray-700 mb-1">
                  Student's Name
                </label>
                <input
                  type="text"
                  id="studentName"
                  name="studentName"
                  value={formData.studentName}
                  onChange={handleChange}
                  placeholder="Student's first name"
                  className="w-full px-4 py-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors"
                />
              </div>
              
              <div>
                <label htmlFor="studentAge" className="block text-sm font-medium text-gray-700 mb-1">
                  Student's Age
                </label>
                <select
                  id="studentAge"
                  name="studentAge"
                  value={formData.studentAge}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors appearance-none"
                  style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"></path></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em" }}
                >
                  <option value="">Select age</option>
                  {ageOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Learning Difference */}
            <div>
              <label htmlFor="learningDifference" className="block text-sm font-medium text-gray-700 mb-1">
                Primary Learning Difference (Optional)
              </label>
              <select
                id="learningDifference"
                name="learningDifference"
                value={formData.learningDifference}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-blue-50 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-300 focus:outline-none transition-colors appearance-none"
                style={{ backgroundImage: "url('data:image/svg+xml;utf8,<svg fill=\"none\" stroke=\"currentColor\" viewBox=\"0 0 24 24\" xmlns=\"http://www.w3.org/2000/svg\"><path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 9l-7 7-7-7\"></path></svg>')", backgroundRepeat: "no-repeat", backgroundPosition: "right 0.5rem center", backgroundSize: "1.5em" }}
              >
                <option value="">Select if applicable</option>
                {learningDifferenceOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            
            {/* Form actions */}
            <div className="flex justify-end gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-4 py-2 text-white bg-orange-500 hover:bg-orange-600 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-orange-400 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Processing..." : "Continue to Payment"}
              </button>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center">
            <div className="mb-6">
              <div className="bg-green-100 p-3 rounded-full mb-4 inline-block">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-medium mb-2">Registration Complete!</h3>
              <p className="text-gray-600 mb-6">
                Complete your payment to secure your spot in our beta program.
              </p>
            </div>
            
            <div className="flex justify-center mb-4">
              <stripe-buy-button
                buy-button-id="buy_btn_1RJ0FPBpB9LJmKwiQfros2F2"
                publishable-key="pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu"
              >
              </stripe-buy-button>
            </div>
            
            <p className="text-sm text-gray-500 mt-4">
              You'll receive a confirmation email after your payment is processed.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BetaSignupModal;
