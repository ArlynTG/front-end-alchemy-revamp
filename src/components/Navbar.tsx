
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Function to handle section navigation
  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    
    // If we're not on the homepage, navigate to homepage first
    if (location.pathname !== "/") {
      // We'll navigate to homepage with hash
      return;
    }
    
    // If we're already on the homepage, scroll to the section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-tobey-blue/90 py-4 backdrop-blur-sm">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
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
        </div>

        <div className="hidden md:flex md:items-center md:gap-8">
          <div className="flex items-center gap-6">
            {location.pathname === "/" ? (
              <>
                <a 
                  href="#features" 
                  className="text-tobey-text hover:text-tobey-orange transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                >
                  Features
                </a>
                <a 
                  href="#story" 
                  className="text-tobey-text hover:text-tobey-orange transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('story');
                  }}
                >
                  Origin Story
                </a>
                <a 
                  href="#demo" 
                  className="text-tobey-text hover:text-tobey-orange transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('demo');
                  }}
                >
                  Demo
                </a>
              </>
            ) : (
              <>
                <Link to="/#features" className="text-tobey-text hover:text-tobey-orange transition-colors">
                  Features
                </Link>
                <Link to="/#story" className="text-tobey-text hover:text-tobey-orange transition-colors">
                  Origin Story
                </Link>
                <Link to="/#demo" className="text-tobey-text hover:text-tobey-orange transition-colors">
                  Demo
                </Link>
              </>
            )}
            <a href="#" className="text-tobey-text font-medium hover:text-tobey-orange transition-colors">Log In</a>
            <Button className="btn-primary">Join the Beta</Button>
          </div>
        </div>

        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white/95 z-40 flex flex-col p-6 md:hidden">
          <nav className="flex flex-col gap-6 text-lg">
            {location.pathname === "/" ? (
              <>
                <a 
                  href="#features" 
                  className="text-tobey-text hover:text-tobey-orange transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                >
                  Features
                </a>
                <a 
                  href="#story" 
                  className="text-tobey-text hover:text-tobey-orange transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('story');
                  }}
                >
                  Origin Story
                </a>
                <a 
                  href="#demo" 
                  className="text-tobey-text hover:text-tobey-orange transition-colors"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('demo');
                  }}
                >
                  Demo
                </a>
              </>
            ) : (
              <>
                <Link to="/#features" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Features
                </Link>
                <Link to="/#story" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Origin Story
                </Link>
                <Link to="/#demo" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  Demo
                </Link>
              </>
            )}
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <a href="#" className="text-center text-tobey-text font-medium hover:text-tobey-orange transition-colors">Log In</a>
            <Button className="btn-primary w-full">Join the Beta</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
