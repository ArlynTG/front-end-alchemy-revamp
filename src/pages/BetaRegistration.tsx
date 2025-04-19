
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RegistrationForm from "@/components/pricing/RegistrationForm";

const BetaRegistration = () => {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  
  useEffect(() => {
    // Get the selected plan from URL params
    const params = new URLSearchParams(location.search);
    const plan = params.get("plan");
    
    if (plan) {
      console.log("Plan from URL:", plan);
      setSelectedPlan(plan);
    } else {
      // If no plan is selected, redirect to pricing
      console.log("No plan selected, redirecting to pricing");
      navigate("/#pricing");
    }
  }, [location, navigate]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-16 md:py-24">
        <div className="container max-w-6xl mx-auto">
          <h2 className="text-4xl font-medium mb-4 text-center"><strong>Beta Registration</strong></h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto text-center">
            Complete your registration to reserve your spot in our exclusive beta program.
          </p>
          
          {selectedPlan && (
            <RegistrationForm selectedPlan={selectedPlan} />
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default BetaRegistration;
