
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "sonner";

const SuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isVerifying, setIsVerifying] = useState(true);
  const [isVerified, setIsVerified] = useState(false);
  
  useEffect(() => {
    const verifyPayment = async () => {
      try {
        // Get the session_id from URL query parameters
        const params = new URLSearchParams(location.search);
        const sessionId = params.get('session_id');
        
        if (!sessionId) {
          toast.error("Payment session ID is missing. Please try again.");
          setIsVerifying(false);
          return;
        }

        // Log verification attempt
        console.log("Verifying payment session:", sessionId);
        
        // In a production app, you would verify with your backend
        // For now, we'll simulate a successful verification
        setTimeout(() => {
          setIsVerifying(false);
          setIsVerified(true);
          toast.success("Payment confirmed! Your subscription is now active.");
          
          // Store verification in localStorage
          localStorage.setItem('payment_verified', 'true');
          localStorage.setItem('payment_session_id', sessionId);
        }, 2000);
        
        // In production, you would use code like this:
        /*
        const response = await fetch('https://your-backend/verify-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ sessionId, email: localStorage.getItem('user_email') })
        });
        
        const data = await response.json();
        
        if (data.success) {
          setIsVerified(true);
          toast.success("Payment confirmed! Your subscription is now active.");
        } else {
          toast.error(data.message || "Payment verification failed. Please contact support.");
        }
        */
      } catch (error) {
        console.error("Payment verification error:", error);
        toast.error("An error occurred while verifying your payment.");
      } finally {
        setIsVerifying(false);
      }
    };
    
    verifyPayment();
  }, [location.search]);
  
  const handleContinue = () => {
    // Navigate to the dashboard or completion page
    navigate("/onboarding?step=complete");
  };
  
  return (
    <div className="text-center py-8">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      
      <h2 className="mt-6 text-3xl font-bold text-gray-900">
        {isVerifying ? "Verifying Payment..." : "Payment Successful!"}
      </h2>
      
      <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
        {isVerifying 
          ? "Please wait while we confirm your payment details." 
          : "Your subscription to Tobey's Tutor has been activated. You'll receive a confirmation email shortly with further instructions."}
      </p>
      
      {!isVerifying && (
        <div className="mt-8 space-y-6">
          <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto text-left">
            <h3 className="text-lg font-medium text-blue-800">What's next?</h3>
            <ul className="mt-4 space-y-3 text-sm text-blue-700">
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <span>Explore the dashboard to see your learning path</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <span>Set up your child's profile with their interests</span>
              </li>
              <li className="flex">
                <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
                <span>Start your first learning session with Tobey's AI tutor</span>
              </li>
            </ul>
          </div>
          
          <Button
            onClick={handleContinue}
            className="px-8 py-2 bg-tobey-orange hover:bg-tobey-orange/90 text-white"
          >
            Continue <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default SuccessPage;
