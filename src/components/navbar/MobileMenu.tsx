
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
  const isParentLoginPage = location.pathname === "/parent-login";
  const isStudentLoginPage = location.pathname === "/student-login";

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-16 bg-tobey-blue/75 z-40 flex flex-col p-6 pb-24 md:hidden shadow-lg h-screen">
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
              className="text-black hover:text-tobey-orange"
            />
            <NavLink 
              to="#story" 
              label="Origin Story"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('story');
              }}
              className="text-black hover:text-tobey-orange"
            />
          </>
        ) : (
          <>
            <NavLink 
              to="/#features" 
              label="Features" 
              onClick={onClose}
              className="text-black hover:text-tobey-orange"
            />
            <NavLink 
              to="/#story" 
              label="Origin Story" 
              onClick={onClose}
              className="text-black hover:text-tobey-orange"
            />
          </>
        )}
        
        {/* Updated Demo link */}
        <NavLink
          to="/demo-v4"
          label="Demo"
          onClick={onClose}
          className="text-black hover:text-tobey-orange"
        />
      </nav>
      <div className="mt-8 flex flex-col gap-4">
        <Collapsible
          open={isLoginOpen}
          onOpenChange={setIsLoginOpen}
          className="w-full"
        >
          <CollapsibleTrigger className="flex items-center justify-between w-full text-center font-medium text-black hover:text-tobey-orange transition-colors py-2">
            Log In
            {isLoginOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </CollapsibleTrigger>
          <CollapsibleContent className="pl-4 py-2 flex flex-col gap-3 bg-white/10 rounded-md mt-1">
            {!isParentLoginPage && (
              <NavLink 
                to="/parent-login" 
                label="Parent" 
                className="text-left text-black hover:text-tobey-orange" 
                onClick={onClose}
              />
            )}
            {!isStudentLoginPage && (
              <NavLink 
                to="/student-login" 
                label="Student" 
                className="text-left text-black hover:text-tobey-orange" 
                onClick={onClose}
              />
            )}
          </CollapsibleContent>
        </Collapsible>
        <Button className="btn-primary w-full" onClick={onJoinBeta}>Join the Beta</Button>
      </div>
    </div>
  );
};

export default MobileMenu;
