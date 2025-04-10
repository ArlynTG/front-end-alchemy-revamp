
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RegistrationFormProps {
  selectedPlan: string;
}

const RegistrationForm = ({ selectedPlan }: RegistrationFormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  
  const handleJoinBeta = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Navigate to confirmation page with state data
      navigate("/beta-confirmed", { 
        state: { 
          firstName, 
          lastName, 
          email, 
          studentFirstName,
          planType: selectedPlan
        } 
      });
    }, 1000);
  };

  return (
    <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto">
      <h3 className="text-2xl font-medium mb-6">Complete Your Registration</h3>
      <form onSubmit={handleJoinBeta} className="flex flex-col space-y-4">
        <div>
          <input
            type="text"
            placeholder="Your First Name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tobey-orange focus:border-transparent"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Last name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tobey-orange focus:border-transparent"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            placeholder="Student's First Name (Optional)"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tobey-orange focus:border-transparent text-gray-700"
            value={studentFirstName}
            onChange={(e) => setStudentFirstName(e.target.value)}
          />
        </div>
        <div>
          <input
            type="email"
            placeholder="Your email address"
            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-tobey-orange focus:border-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit"
          className="w-full btn-primary text-lg py-6"
          disabled={isLoading}
        >
          {isLoading ? "Processing..." : "Reserve Your Spot →"}
        </Button>
        <p className="text-xs text-gray-500">
          Limited to 200 early adopters. Secure your spot now!
        </p>
      </form>
    </div>
  );
};

export default RegistrationForm;
