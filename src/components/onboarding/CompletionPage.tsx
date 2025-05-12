
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompletionPage = () => {
  const navigate = useNavigate();

  const handleContinue = () => {
    navigate("/parent-dashboard");
  };

  return (
    <div className="text-center py-8">
      <div className="flex justify-center">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>
      </div>
      <h2 className="mt-6 text-3xl font-bold text-gray-900">Setup Complete!</h2>
      <p className="mt-4 text-lg text-gray-600 max-w-md mx-auto">
        Your account has been successfully set up. You now have full access to Tobey's Tutor.
      </p>
      
      <div className="mt-8 space-y-6">
        <div className="bg-blue-50 rounded-lg p-6 max-w-md mx-auto text-left">
          <h3 className="text-lg font-medium text-blue-800">What's next?</h3>
          <ul className="mt-4 space-y-3 text-sm text-blue-700">
            <li className="flex">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <span>Explore the dashboard to see your child's learning path</span>
            </li>
            <li className="flex">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <span>Set up your child's profile with their interests and goals</span>
            </li>
            <li className="flex">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <span>Start your first learning session with Tobey's AI tutor</span>
            </li>
            <li className="flex">
              <CheckCircle className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0" />
              <span>Explore available learning resources for your child</span>
            </li>
          </ul>
        </div>
        
        <Button
          onClick={handleContinue}
          className="px-8 py-2 bg-tobey-orange hover:bg-tobey-orange/90 text-white"
        >
          Go to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default CompletionPage;
