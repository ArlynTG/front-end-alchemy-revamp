
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Check, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";

const BetaConfirmed = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<{
    firstName?: string;
    studentFirstName?: string;
  } | null>(null);
  
  // On component mount, try to get state from localStorage if it's not available in navigation state
  useEffect(() => {
    try {
      // Try to recover data from localStorage if navigation state is lost during page transitions
      const savedUserData = localStorage.getItem('betaConfirmationData');
      if (savedUserData) {
        setUserData(JSON.parse(savedUserData));
      } else {
        // If no saved data, redirect to home
        navigate('/', { replace: true });
      }
    } catch (error) {
      console.error("Error loading beta confirmation data:", error);
      // In case of error, at least show the generic confirmation
    }
  }, [navigate]);

  const firstName = userData?.firstName || '';
  const studentFirstName = userData?.studentFirstName || '';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <Helmet>
        <title>Tobey's Tutor: Beta Confirmed | AI Learning Assistant</title>
        <meta name="description" content="AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential." />
        <meta property="og:title" content="Tobey's Tutor: Beta Confirmed | AI Learning Assistant" />
        <meta property="og:description" content="AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential." />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="bg-white rounded-2xl shadow-md p-8 max-w-md w-full text-center">
        <div className="mb-6 flex flex-col items-center">
          <div className="bg-green-100 p-3 rounded-full mb-4">
            <Check className="h-8 w-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Beta Reservation Confirmed!</h1>
          <p className="text-gray-600">
            Thank you{firstName ? `, ${firstName}` : ""}, for joining our beta waitlist.
            {studentFirstName && (
              <span className="block text-sm mt-2 text-gray-500">
                We're excited to support {studentFirstName}'s learning journey!
              </span>
            )}
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
              <span>You'll receive an invitation email when we launch in June 2025</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-tobey-orange font-bold">•</span>
              <span>You'll be among the first 200 users to experience Tobey's Tutor</span>
            </li>
          </ul>
        </div>

        <Link to="/">
          <Button className="w-full bg-tobey-orange hover:bg-tobey-orange/90">
            Back to homepage
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BetaConfirmed;
