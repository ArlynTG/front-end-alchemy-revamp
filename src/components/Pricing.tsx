
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [studentFirstName, setStudentFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedPlan, setSelectedPlan] = useState("early-adopter");
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

  const plans = [
    {
      id: "early-adopter",
      name: "Early Adopter Special",
      price: 29,
      period: "mo",
      description: "Starting with a 7-day free trial",
      features: [
        "Personalized AI tutoring for all subjects",
        "Progress tracking and insights",
        "Parent dashboard and reports",
        "Unlimited chat sessions"
      ],
      highlighted: true
    },
    {
      id: "launch",
      name: "Launch Plan",
      price: 39,
      period: "mo",
      description: "Pay monthly, cancel anytime",
      features: [
        "Everything in Early Adopter",
        "Priority support",
        "Advanced analytics",
        "Custom learning paths"
      ],
      highlighted: false
    },
    {
      id: "annual",
      name: "Annual Plan",
      price: 299,
      period: "yr",
      description: "Save $49 compared to monthly",
      features: [
        "Everything in Launch Plan",
        "2 months free",
        "Premium learning resources",
        "Exclusive webinars for parents"
      ],
      highlighted: false
    }
  ];

  return (
    <section id="pricing" className="py-16 md:py-24">
      <div className="container max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-medium mb-4"><strong>Join Our Limited Beta</strong></h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Be one of only 200 users to get early access.
          <br />
          <span className="text-base text-gray-500">Expected launch: May 2025</span>
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`overflow-hidden ${plan.highlighted ? 'ring-2 ring-tobey-orange shadow-lg' : 'shadow-md'}`}
            >
              <CardHeader className={`pb-4 ${plan.highlighted ? 'bg-tobey-orange/10' : ''}`}>
                <div className="flex items-center justify-center gap-2 mb-2">
                  <div className={`${plan.highlighted ? 'bg-tobey-orange/20' : 'bg-gray-100'} p-2 rounded-full`}>
                    <svg 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      className={`h-6 w-6 ${plan.highlighted ? 'text-tobey-orange' : 'text-gray-500'}`}
                      stroke="currentColor" 
                      strokeWidth="2"
                    >
                      <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <span className="text-xl font-medium">{plan.name}</span>
                </div>
                
                <div className="flex items-baseline justify-center gap-1 my-6">
                  <h3 className="text-5xl font-bold">${plan.price}</h3>
                  <span className="text-xl text-gray-500 font-normal">/{plan.period}</span>
                </div>
                
                <CardDescription className="text-gray-600">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="pt-6">
                <div className="space-y-4 mb-8 text-left">
                  {plan.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className={`h-5 w-5 ${plan.highlighted ? 'text-tobey-orange' : 'text-gray-500'} mt-0.5`} />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${plan.highlighted ? 'btn-primary' : 'btn-secondary'} text-lg py-6`}
                  onClick={() => setSelectedPlan(plan.id)}
                >
                  {plan.highlighted ? "Reserve Your Spot →" : "Choose Plan"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {selectedPlan && (
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
        )}
      </div>
    </section>
  );
};

export default Pricing;
