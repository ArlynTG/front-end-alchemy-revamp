
import React from "react";
import { Mail } from "lucide-react";

interface ContactProps {
  id?: string;
}

const Contact = ({ id }: ContactProps) => {
  return (
    <section id={id || "contact"} className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Get in Touch with Us</h2>
          <div className="space-y-2 text-gray-600 max-w-2xl mx-auto">
            <p>Have more questions or comments?</p>
            <p>Get in touch with our team and we'll get back to you as soon as possible.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="bg-tobey-peach/30 p-8 rounded-xl max-w-md w-full">
            <h3 className="text-2xl font-medium mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-tobey-orange/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-tobey-orange" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Email Us</p>
                  <a href="mailto:support@tobeystutor.com" className="text-tobey-text hover:text-tobey-orange transition-colors">
                    support@tobeystutor.com
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="max-w-md w-full">
            <img 
              src="/lovable-uploads/current_upload.png" 
              alt="Students collaborating on laptops" 
              className="w-full h-auto rounded-xl object-cover shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

