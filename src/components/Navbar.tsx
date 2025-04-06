import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-tobey-blue py-4">
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
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
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8">
          <a href="#" className="text-tobey-text hover:text-tobey-orange transition-colors">Home</a>
          <a href="#features" className="text-tobey-text hover:text-tobey-orange transition-colors">Features</a>
          <a href="#story" className="text-tobey-text hover:text-tobey-orange transition-colors">Our Story</a>
          <a href="#pricing" className="text-tobey-text hover:text-tobey-orange transition-colors">Pricing</a>
          <a href="#contact" className="text-tobey-text hover:text-tobey-orange transition-colors">Contact</a>
        </nav>

        {/* Login and Signup Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <a href="#" className="text-tobey-text font-medium hover:text-tobey-orange transition-colors">Log In</a>
          <Button className="btn-primary">Sign Up</Button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white/95 z-40 flex flex-col p-6 md:hidden">
          <nav className="flex flex-col gap-6 text-lg">
            <a href="#" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Home</a>
            <a href="#features" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#story" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Our Story</a>
            <a href="#pricing" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <a href="#contact" className="text-tobey-text hover:text-tobey-orange transition-colors" onClick={() => setMobileMenuOpen(false)}>Contact</a>
          </nav>
          <div className="mt-8 flex flex-col gap-4">
            <a href="#" className="text-center text-tobey-text font-medium hover:text-tobey-orange transition-colors">Log In</a>
            <Button className="btn-primary w-full">Sign Up</Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
