
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { CheckCircle } from 'lucide-react';

interface PaymentFormProps {
  onPaymentComplete: (paymentId: string) => void;
  onBack: () => void;
}

// This is a placeholder that will be replaced with actual Stripe integration
const PaymentForm = ({ onPaymentComplete, onBack }: PaymentFormProps) => {
  const [isAgreed, setIsAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAgreed) return;

    setIsProcessing(true);
    
    // This is a placeholder for the actual Stripe payment processing
    // In the future, this will be replaced with a real Stripe checkout
    setTimeout(() => {
      // Simulate successful payment
      const mockPaymentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
      
      setIsProcessing(false);
      onPaymentComplete(mockPaymentId);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Subscription Payment</h2>
        <p className="mt-1 text-sm text-gray-500">
          Set up your subscription to access all features of Tobey's Tutor.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Beta Subscription</CardTitle>
          <CardDescription>Early access to Tobey's Tutor with special beta pricing</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center">
            <div>
              <p className="text-2xl font-semibold">$19.99<span className="text-sm text-gray-500">/month</span></p>
              <p className="text-sm text-gray-500 mt-1">Billed monthly, cancel anytime</p>
            </div>
            <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-1 rounded-full">
              Beta discount applied
            </div>
          </div>

          <div className="mt-4 space-y-2">
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Unlimited access to Tobey's AI tutor</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Personalized learning paths for your child</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Regular progress reports and insights</span>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
              <span className="text-gray-700">Early access to new features</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col items-start">
          <div className="flex items-top space-x-2 mb-4">
            <Checkbox 
              id="terms" 
              checked={isAgreed} 
              onCheckedChange={(checked) => setIsAgreed(!!checked)} 
            />
            <div className="grid gap-1.5 leading-none">
              <Label 
                htmlFor="terms" 
                className="text-sm font-normal text-gray-700"
              >
                I agree to the <a href="#" className="text-tobey-orange hover:underline">Terms of Service</a> and <a href="#" className="text-tobey-orange hover:underline">Privacy Policy</a>
              </Label>
            </div>
          </div>
          <p className="text-sm text-gray-500 mb-4">
            Your card will be charged immediately. You can cancel anytime from your account settings.
          </p>
        </CardFooter>
      </Card>

      <form onSubmit={handleSubmit}>
        <div className="pt-4 border-t border-gray-200 mt-8">
          <p className="text-sm text-gray-500 mb-8">
            Payment information will be securely processed by Stripe. Your card details are never stored on our servers.
          </p>

          {/* This is a placeholder for the Stripe payment form */}
          <div className="p-4 border border-gray-200 rounded-md bg-gray-50">
            <p className="text-center text-gray-500">
              Stripe Payment Element will be integrated here
            </p>
          </div>

          <div className="flex justify-between mt-8">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onBack}
            >
              Back
            </Button>
            <Button 
              type="submit"
              disabled={!isAgreed || isProcessing}
              className="bg-tobey-orange hover:bg-tobey-orange/90 text-white"
            >
              {isProcessing ? "Processing..." : "Subscribe Now"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
