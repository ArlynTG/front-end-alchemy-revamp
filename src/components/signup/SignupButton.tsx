
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SignupButtonProps {
  children?: React.ReactNode;
  className?: string;
}

const SignupButton = ({ children = "Sign Up", className }: SignupButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup-test");
  };

  return (
    <Button 
      onClick={handleClick}
      className={className}
    >
      {children}
    </Button>
  );
};

export default SignupButton;
