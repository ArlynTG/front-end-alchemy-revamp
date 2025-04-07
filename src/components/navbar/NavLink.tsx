
import { Link, useLocation } from "react-router-dom";

interface NavLinkProps {
  to: string;
  label: string;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

const NavLink = ({ to, label, onClick, className = "" }: NavLinkProps) => {
  const location = useLocation();
  const isExternal = to.startsWith("http");
  const isHashLink = to.startsWith("#");
  
  const baseClasses = "text-tobey-text hover:text-tobey-orange transition-colors";
  const combinedClasses = `${baseClasses} ${className}`;

  if (isExternal) {
    return (
      <a 
        href={to} 
        className={combinedClasses}
        target="_blank" 
        rel="noopener noreferrer"
      >
        {label}
      </a>
    );
  }

  if (isHashLink && location.pathname === "/") {
    return (
      <a 
        href={to} 
        className={combinedClasses}
        onClick={onClick}
      >
        {label}
      </a>
    );
  }

  return (
    <Link 
      to={to} 
      className={combinedClasses}
      onClick={onClick}
    >
      {label}
    </Link>
  );
};

export default NavLink;
