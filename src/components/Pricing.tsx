import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
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
          studentFirstName 
        } 
      });
    }, 1000);
  };

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container max-w-5xl mx-auto text-center">
        <h2 className="text-4xl font-medium mb-4"><strong>Join Our Limited Beta</strong></h2>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Be one of only 200 users to get early access.
          <br />
          <span className="text-base text-gray-500">Expected launch: May 2025</span>
        </p>
        
        <div className="bg-white rounded-2xl shadow-md p-8 max-w-md mx-auto">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="bg-tobey-orange/10 p-2 rounded-full">
              <svg 
                viewBox="0 0 24 24" 
                fill="none" 
                className="h-6 w-6 text-tobey-orange"
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <span className="text-xl font-medium">Early Adopter Special</span>
          </div>
          
          <div className="flex items-baseline justify-center gap-1 my-6">
            <h3 className="text-5xl font-bold">$29</h3>
            <span className="text-xl text-gray-500 font-normal">/mo</span>
          </div>
          
          <p className="text-gray-600 mb-8">
            Starting with a 7-day free trial
          </p>
          
          <div className="space-y-4 mb-8 text-left">
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Personalized AI tutoring for all subjects</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Progress tracking and insights</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Parent dashboard and reports</span>
            </div>
            <div className="flex items-start gap-3">
              <Check className="h-5 w-5 text-tobey-orange mt-0.5" />
              <span>Unlimited chat sessions</span>
            </div>
          </div>
          
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
      </div>
    </section>
  );
};

export default Pricing;
