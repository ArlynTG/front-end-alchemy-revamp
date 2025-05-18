
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

interface PaymentFormProps {
  onPaymentComplete: (paymentId: string) => void;
  onBack: () => void;
}

// The direct Stripe checkout URL
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/00w7sKbnj3Tg4KQ1sP9bO03";

const PaymentForm = ({ onPaymentComplete, onBack }: PaymentFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [termsAccepted, setTermsAccepted] = useState(false);
  
  // Use state to store the email directly in the component
  // This serves as a backup to localStorage
  const [email, setEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Direct approach to get email - try localStorage first
    let userEmail = localStorage.getItem('user_email');
    
    // If email isn't in localStorage, get it from the form DOM if available
    if (!userEmail) {
      const profileForm = document.getElementById('profile-form');
      if (profileForm) {
        const emailInput = profileForm.querySelector('input[name="email"]') as HTMLInputElement;
        if (emailInput && emailInput.value) {
          userEmail = emailInput.value;
          // Save it to localStorage
          localStorage.setItem('user_email', userEmail);
        }
      }
    }
    
    // Set to component state
    setEmail(userEmail);
    
    // Show error if still no email
    if (!userEmail) {
      setErrorMessage('Email address is missing. Please go back and complete the profile form first.');
    } else {
      setErrorMessage(null);
    }
  }, []);
  
  const handleSubscribe = async () => {
    if (!termsAccepted) {
      setErrorMessage('Please accept the Terms of Service and Privacy Policy to continue.');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Use email from component state as first priority
      const userEmail = email || localStorage.getItem('user_email');
      
      if (!userEmail) {
        throw new Error('Email address is required. Please go back and complete the profile form first.');
      }
      
      // Generate a unique ID for this transaction
      const signupId = localStorage.getItem('signup_id') || `user-${Date.now()}`;
      
      // Log the customer click for analytics purposes
      console.log(`Redirecting to Stripe checkout: User ${userEmail}, ID ${signupId}`);
      
      // Call onPaymentComplete with 'pending' to update the UI state
      onPaymentComplete('pending');
      
      // Redirect to Stripe checkout URL
      window.location.href = STRIPE_CHECKOUT_URL;
    } catch (error) {
      console.error('Payment error:', error);
      setErrorMessage(error instanceof Error ? error.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Subscription Payment</h2>
        <p className="mt-1 text-sm text-gray-500">
          Set up your subscription to access all features of Tobey's Tutor.
        </p>
      </div>
      
      {/* Subscription plan details */}
      <div className="border rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900">Early Adopter Special</h3>
        <p className="text-sm text-gray-500">Early access to Tobey's Tutor with special beta pricing</p>
        
        <div className="mt-4">
          <p className="text-2xl font-semibold">$29<span className="text-sm font-normal text-gray-500">/month</span></p>
          <p className="text-sm text-gray-500">Billed monthly, cancel anytime</p>
        </div>
        
        <ul className="mt-4 space-y-2">
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="ml-2 text-sm text-gray-700">Unlimited access to Tobey's AI tutor</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="ml-2 text-sm text-gray-700">Personalized learning paths for your child</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="ml-2 text-sm text-gray-700">Regular progress reports and insights</span>
          </li>
          <li className="flex items-start">
            <svg className="h-5 w-5 text-green-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
            <span className="ml-2 text-sm text-gray-700">Early access to new features</span>
          </li>
        </ul>
      </div>
      
      {/* Debug info - only show in development */}
      <div className="bg-gray-100 p-2 text-xs">
        <p>Debugging info (hidden in production)</p>
        <p>Email: {email || 'Not found'}</p>
        <p>localStorage email: {localStorage.getItem('user_email') || 'Not found'}</p>
      </div>
      
      {/* Error message display */}
      {errorMessage && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">{errorMessage}</p>
            </div>
          </div>
        </div>
      )}
      
      {/* Terms agreement */}
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 text-sm">
          <label htmlFor="terms" className="font-medium text-gray-700">
            I agree to the{" "}
            <a href="/terms" className="text-indigo-600 hover:text-indigo-500">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="/privacy" className="text-indigo-600 hover:text-indigo-500">
              Privacy Policy
            </a>
          </label>
          <p className="text-gray-500">
            Your card will be charged immediately. You can cancel anytime from your account settings.
          </p>
        </div>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <p className="text-sm text-gray-500 mb-4">
          Payment information will be securely processed by Stripe. Your card details are never stored on our servers.
        </p>
        
        <div className="border rounded p-4 text-center text-gray-500 mb-6">
          Stripe Payment Element will be integrated here
        </div>
        
        <div className="flex justify-between">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            disabled={isLoading}
          >
            Back
          </Button>
          
          <Button
            type="button"
            onClick={handleSubscribe}
            disabled={isLoading || !termsAccepted}
          >
            {isLoading ? "Processing..." : "Subscribe Now"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentForm;
