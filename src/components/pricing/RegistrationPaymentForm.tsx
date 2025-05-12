
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { RegistrationFormValues } from "@/utils/formSchemas";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import { CreditCard } from "lucide-react";

interface RegistrationPaymentFormProps {
  formData: RegistrationFormValues;
  onPaymentSuccess: (paymentId: string) => void;
  onBackToDetails: () => void;
  isLoading: boolean;
}

const RegistrationPaymentForm = ({
  formData,
  onPaymentSuccess,
  onBackToDetails,
  isLoading
}: RegistrationPaymentFormProps) => {
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvc, setCvc] = useState("");
  const [processing, setProcessing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate a random payment ID to simulate a successful payment
      const mockPaymentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
      
      toast({
        title: "Payment successful!",
        description: "Your payment has been processed successfully.",
      });
      
      onPaymentSuccess(mockPaymentId);
      setProcessing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="font-medium mb-2">Your Information</h4>
        <p className="text-sm text-gray-700">{formData.firstName} {formData.lastName}</p>
        <p className="text-sm text-gray-700">{formData.email}</p>
      </div>
      
      {/* Stripe Payment UI mockup */}
      <div className="border rounded-lg p-4">
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="h-5 w-5 text-blue-500" />
          <h3 className="font-medium">Payment Information</h3>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="card-number">Card Number</Label>
            <Input 
              id="card-number" 
              placeholder="4242 4242 4242 4242"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">Expiry Date</Label>
              <Input 
                id="expiry" 
                placeholder="MM / YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="cvc">CVC</Label>
              <Input 
                id="cvc" 
                placeholder="123"
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                required
              />
            </div>
          </div>
          
          <div className="pt-2 flex flex-col gap-3">
            <Button 
              type="submit"
              className="w-full"
              disabled={processing || isLoading}
            >
              {processing ? "Processing..." : `Pay ${formData.planType === 'early-adopter' ? '$29.00' : '$19.00'}`}
            </Button>
            
            <Button 
              variant="outline"
              type="button"
              className="w-full"
              onClick={onBackToDetails}
              disabled={processing || isLoading}
            >
              Back to Personal Details
            </Button>
          </div>
          
          <div className="text-xs text-gray-500 text-center mt-2">
            <p>Your payment is secure. We use Stripe for secure payment processing.</p>
            <div className="flex justify-center gap-2 mt-2">
              <img src="/placeholder.svg" alt="Visa" className="h-6" />
              <img src="/placeholder.svg" alt="Mastercard" className="h-6" />
              <img src="/placeholder.svg" alt="Amex" className="h-6" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPaymentForm;
