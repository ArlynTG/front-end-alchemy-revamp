
import { Button } from "@/components/ui/button";
import NavLink from "./NavLink";
import { useLocation } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

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
            <NavLink to="/#features" label="Features" />
            <NavLink to="/#story" label="Origin Story" />
            <NavLink to="/#demo" label="FAQ" />
          </>
        )}
        
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
        
        <Button className="btn-primary" onClick={onJoinBeta}>Join the Beta</Button>
      </div>
    </div>
  );
};

export default DesktopNav;
