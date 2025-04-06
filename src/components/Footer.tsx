
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-tobey-blue py-6">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <svg 
              viewBox="0 0 24 24" 
              fill="none" 
              className="h-6 w-6 text-tobey-orange"
              stroke="currentColor" 
              strokeWidth="2"
            >
              <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span className="text-lg font-medium text-tobey-orange">Tobey's Tutor</span>
          </div>
          
          <div className="text-left">
            <p className="text-gray-600 text-sm flex flex-col items-end">
              <span>Unlock potential.</span>
              <span>Celebrate neurodiversity.</span>
              <span>Transform Learning.</span>
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2025 Tobey's Tutor, Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link to="/privacy-policy" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Terms of Service</Link>
            <Link to="/cookie-policy" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
