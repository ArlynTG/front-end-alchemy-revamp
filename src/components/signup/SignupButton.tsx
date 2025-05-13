
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import BetaSignupModal from "./BetaSignupModal";

interface SignupButtonProps {
  label?: string;
  className?: string;
  planId?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const SignupButton: React.FC<SignupButtonProps> = ({ 
  label = "Join the Beta", 
  className = "",
  planId = "early-adopter",
  variant = "default"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button 
        onClick={() => setIsModalOpen(true)}
        className={className}
        variant={variant}
      >
        {label}
      </Button>
      
      <BetaSignupModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        planId={planId}
      />
    </>
  );
};

export default SignupButton;
