
import React from "react";
import { Link } from "react-router-dom";

interface SignupButtonProps {
  label?: string;
  className?: string;
  planId?: string;
  to?: string;
}

const SignupButton: React.FC<SignupButtonProps> = ({
  label = "Sign Up",
  className = "",
  planId = "early-adopter",
  to = "",
}) => {
  if (to) {
    return (
      <Link to={to} className={`px-4 py-2 rounded ${className || "bg-orange-500 hover:bg-orange-600 text-white"}`}>
        {label}
      </Link>
    );
  }

  return (
    <button 
      className={`px-4 py-2 rounded ${className || "bg-orange-500 hover:bg-orange-600 text-white"}`}
    >
      {label}
    </button>
  );
};

export default SignupButton;
