
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Stopwatch } from "lucide-react";
import { SignupButton } from "@/components/signup";

interface DesktopNavProps {
  scrollToSection: (sectionId: string) => void;
  onJoinBeta: () => void;
}

const DesktopNav = ({ scrollToSection, onJoinBeta }: DesktopNavProps) => {
  const location = useLocation();
  const isParentLoginPage = location.pathname === "/parent-login";
  const isStudentLoginPage = location.pathname === "/student-login";

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
              to="#faq" 
              label="FAQ"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('faq');
              }}
            />
          </>
        ) : (
          <>
            <NavLink to="/#features" label="Features" />
            <NavLink to="/#story" label="Origin Story" />
            <NavLink to="/#faq" label="FAQ" />
          </>
        )}
        
        {/* Updated Demo link */}
        <NavLink to="/demo-v5" label="Demo" />
        
        <DropdownMenu>
          <DropdownMenuTrigger className="text-tobey-text hover:text-tobey-orange transition-colors font-medium flex items-center">
            Log In <ChevronDown size={16} className="ml-1" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-white">
            {!isParentLoginPage && (
              <DropdownMenuItem className="cursor-pointer">
                <NavLink to="/parent-login" label="Parent" className="w-full" />
              </DropdownMenuItem>
            )}
            {!isStudentLoginPage && (
              <DropdownMenuItem className="cursor-pointer">
                <NavLink to="/student-login" label="Student" className="w-full" />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
        
        <SignupButton 
          className="btn-primary flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-tobey-orange text-white hover:bg-tobey-orange/90" 
          label="Join the Beta for $1"
        />
      </div>
    </div>
  );
};

export default DesktopNav;
