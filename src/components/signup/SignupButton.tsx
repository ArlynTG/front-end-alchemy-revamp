
import React, { useState } from "react";
import BetaSignupModal from "./BetaSignupModal";

interface SignupButtonProps {
  label?: string;
  className?: string;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  label = "Sign Up",
  className = "",
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
      />
    </>
  );
};

export default SignupButton;
