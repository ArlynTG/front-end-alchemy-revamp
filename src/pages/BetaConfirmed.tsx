
import { useLocation, Navigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";

const BetaConfirmed = () => {
  const location = useLocation();
  const { firstName } = location.state || {};

  // If someone tries to access this page directly without state, redirect to home
  if (!location.state) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Beta Reservation Confirmed!</h1>
          <p className="text-gray-600">
            Thank you{firstName ? `, ${firstName}` : ""}, for joining our beta waitlist.
          </p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-5 w-5 text-tobey-orange" />
            <span className="font-medium">What happens next?</span>
          </div>
          <ul className="text-left text-gray-700 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-tobey-orange font-bold">•</span>
              <span>We've sent a confirmation email to your inbox</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tobey-orange font-bold">•</span>
              <span>You'll receive an invitation email when we launch in May 2025</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tobey-orange font-bold">•</span>
              <span>You'll be among the first 200 users to experience Tobey's Tutor</span>
            </li>
          </ul>
        </div>

        <Link to="/">
          <Button className="w-full">
            Back to homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BetaConfirmed;
