
import React, { useState } from "react";
import BetaSignupModal from "./BetaSignupModal";
import { Button } from "@/components/ui/button";

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
        className={className}
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
