
import { useState, useEffect } from "react";

export const useNavbarScroll = () => {
  const [scrolled, setScrolled] = useState(false);
  const [navbarClasses, setNavbarClasses] = useState(
    "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300"
  );

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
        
        setNavbarClasses(
          isScrolled
            ? "fixed top-0 left-0 right-0 z-50 py-2 bg-white shadow-md transition-all duration-300"
            : "fixed top-0 left-0 right-0 z-50 py-3 transition-all duration-300"
        );
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Initial check on mount
    handleScroll();
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  return {
    scrolled,
    navbarClasses,
  };
};
