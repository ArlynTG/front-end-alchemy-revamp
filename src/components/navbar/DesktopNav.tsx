
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";

interface DesktopNavProps {
  scrollToSection: (sectionId: string) => void;
  onJoinBeta: () => void;
}

const DesktopNav = ({ scrollToSection, onJoinBeta }: DesktopNavProps) => {
  const location = useLocation();

  return (
    <div className="hidden md:flex md:items-center md:gap-8">
      <div className="flex items-center gap-6">
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
              label="Got Questions?"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('demo');
              }}
            />
          </>
        ) : (
          <>
            <NavLink to="/#features" label="Features" />
            <NavLink to="/#story" label="Origin Story" />
            <NavLink to="/#demo" label="Got Questions?" />
          </>
        )}
        <NavLink to="#" label="Log In" className="font-medium" />
        <Button className="btn-primary" onClick={onJoinBeta}>Join the Beta</Button>
      </div>
    </div>
  );
};

export default DesktopNav;
