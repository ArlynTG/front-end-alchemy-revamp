
const Footer = () => {
  return (
    <footer className="bg-tobey-blue py-12">
      <div className="container">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
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
            <p className="text-gray-600 text-sm">
              AI-powered learning designed for neurodivergent minds
            </p>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Our Team</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Careers</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Help Center</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Tutorials</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Research</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Case Studies</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium mb-4">Contact</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">hello@tobeystutor.com</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">+1 (555) 123-4567</a></li>
              <li><a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">123 Learning Lane, San Francisco, CA</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm">© 2025 Tobey's Tutor, Inc. All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-gray-600 hover:text-tobey-orange transition-colors text-sm">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

