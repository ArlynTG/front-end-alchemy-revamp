
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useNavbarScroll } from "@/hooks/useNavbarScroll";
import NavbarLogo from "./navbar/NavbarLogo";
import DesktopNav from "./navbar/DesktopNav";
import MobileMenu from "./navbar/MobileMenu";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { navbarClasses } = useNavbarScroll();

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

  // Handle join beta button click
  const handleJoinBeta = () => {
    setMobileMenuOpen(false);

    // If we're not on the homepage, navigate to homepage with pricing hash
    if (location.pathname !== "/") {
      window.location.href = "/#pricing";
      return;
    }
    
    // If we're already on the homepage, scroll to pricing section
    const pricingSection = document.getElementById("pricing");
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className={navbarClasses}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <NavbarLogo />
        </div>

        <DesktopNav 
          scrollToSection={scrollToSection} 
          onJoinBeta={handleJoinBeta} 
        />

        <button 
          className="md:hidden text-white bg-tobey-orange rounded-full p-1"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      <MobileMenu 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        onJoinBeta={handleJoinBeta}
        scrollToSection={scrollToSection}
      />
    </header>
  );
};

export default Navbar;
