
import { useState, useEffect } from "react";

export const useNavbarScroll = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll event listener to track scroll position
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dynamic classes for the navbar based on scroll position
  const navbarClasses = `sticky top-0 z-50 py-4 backdrop-blur-sm transition-all duration-200 ${
    isScrolled 
      ? 'bg-tobey-blue/75 border-b border-white/10' 
      : 'bg-tobey-blue/50'
  }`;

  return { isScrolled, navbarClasses };
};

