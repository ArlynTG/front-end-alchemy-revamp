
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinBeta: () => void;
  scrollToSection: (sectionId: string) => void;
}

const MobileMenu = ({ isOpen, onClose, onJoinBeta, scrollToSection }: MobileMenuProps) => {
  const location = useLocation();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-16 bg-white/95 z-40 flex flex-col p-6 md:hidden">
      <nav className="flex flex-col gap-6 text-lg">
        {location.pathname === "/" ? (
          <>
            <NavLink 
              to="#features" 
              label="Features"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('features');
              }}
            />
            <NavLink 
              to="#story" 
              label="Origin Story"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('story');
              }}
            />
            <NavLink 
              to="#demo" 
              label="Demo"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo');
              }}
            />
          </>
        ) : (
          <>
            <NavLink to="/#features" label="Features" onClick={onClose} />
            <NavLink to="/#story" label="Origin Story" onClick={onClose} />
            <NavLink to="/#demo" label="Demo" onClick={onClose} />
          </>
        )}
      </nav>
      <div className="mt-8 flex flex-col gap-4">
        <NavLink to="#" label="Log In" className="text-center font-medium" />
        <Button className="btn-primary w-full" onClick={onJoinBeta}>Join the Beta</Button>
      </div>
    </div>
  );
};

export default MobileMenu;
