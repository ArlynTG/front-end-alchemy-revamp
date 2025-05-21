
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BetaSignupModal from "@/components/pricing/BetaSignupModal";

const SignupTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    // Navigate back to homepage when modal is closed
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <BetaSignupModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        planId="early-adopter"
      />
    </div>
  );
};

export default SignupTest;
