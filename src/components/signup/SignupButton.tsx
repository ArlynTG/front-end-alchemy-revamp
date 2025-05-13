
import React, { useState } from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import BetaSignupModal from "./BetaSignupModal";

interface SignupButtonProps extends ButtonProps {
  label?: string;
  planId?: string;
}

const SignupButton: React.FC<SignupButtonProps> = ({ 
  label = "Join Beta", 
  planId = "early-adopter",
  className,
  ...buttonProps 
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button 
        onClick={openModal} 
        className={className}
        {...buttonProps}
      >
        {label}
      </Button>
      
      <BetaSignupModal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        planId={planId}
      />
    </>
  );
};

export default SignupButton;
