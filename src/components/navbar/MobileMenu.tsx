
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onJoinBeta: () => void;
  scrollToSection: (sectionId: string) => void;
}

const MobileMenu = ({ isOpen, onClose, onJoinBeta, scrollToSection }: MobileMenuProps) => {
  const location = useLocation();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

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
              label="FAQ"
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
            <NavLink to="/#demo" label="FAQ" onClick={onClose} />
          </>
        )}
      </nav>
      <div className="mt-8 flex flex-col gap-4">
        <Collapsible
          open={isLoginOpen}
          onOpenChange={setIsLoginOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full text-center font-medium text-tobey-text hover:text-tobey-orange transition-colors py-2">
            Log In
            {isLoginOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 py-2 flex flex-col gap-3">
            <NavLink to="/parent-login" label="Parent" className="text-left" onClick={onClose} />
            <NavLink to="/student-login" label="Student" className="text-left" onClick={onClose} />
          </CollapsibleContent>
        </Collapsible>
        <Button className="btn-primary w-full" onClick={onJoinBeta}>Join the Beta</Button>
      </div>
    </div>
  );
};

export default MobileMenu;
