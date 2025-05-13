
import React, { useState } from "react";
import BetaSignupModal from "./BetaSignupModal";

interface SignupButtonProps {
  label?: string;
  className?: string;
  planId?: string;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  label = "Sign Up",
  className = "",
  planId = "early-adopter",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <button 
        onClick={openModal} 
        className={`px-4 py-2 rounded ${className || "bg-orange-500 hover:bg-orange-600 text-white"}`}
      >
        {label}
      </button>
      
      <BetaSignupModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        planId={planId}
      />
    </>
  );
};

export default SignupButton;
