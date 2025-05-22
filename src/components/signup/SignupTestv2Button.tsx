
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface SignupTestv2ButtonProps {
  children?: React.ReactNode;
  className?: string;
  label?: string;
}

const SignupTestv2Button = ({ 
  children, 
  className, 
  label
}: SignupTestv2ButtonProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/signup-testv2");
  };

  return (
    <Button 
      onClick={handleClick}
      className={className}
      variant="outline"
    >
      {children || label || "Try Frontend Only Signup"}
    </Button>
  );
};

export default SignupTestv2Button;
