
import { Link, useLocation } from "react-router-dom";

const NavbarLogo = () => {
  const location = useLocation();
  
  const handleLogoClick = (e: React.MouseEvent) => {
    // If already on homepage, scroll to top
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link to="/" className="flex items-center gap-2" onClick={handleLogoClick}>
      <svg 
        viewBox="0 0 24 24" 
        fill="none" 
        className="h-7 w-7 text-black"
        stroke="currentColor" 
        strokeWidth="2"
      >
        <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      <span className="text-xl font-medium text-tobey-orange">Tobey's Tutor</span>
    </Link>
  );
};

export default NavbarLogo;
