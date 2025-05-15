
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SignupButtonProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  to?: string;
}

const SignupButton = ({ 
  children, 
  className, 
  label, 
  to = "/signup-test" 
}: SignupButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(to);
  };

  return (
    <Button 
      onClick={handleClick}
      className={className}
    >
      {children || label || "Sign Up"}
    </Button>
  );
};

export default SignupButton;
