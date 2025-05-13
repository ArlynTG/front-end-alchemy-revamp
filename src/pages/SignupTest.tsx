
import { useState, useEffect } from "react";
import BetaSignupModal from "@/components/signup/BetaSignupModal";

const SignupTest = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);

  const closeModal = () => setIsModalOpen(false);

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
