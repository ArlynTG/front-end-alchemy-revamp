
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

interface ContactProps {
  id?: string;
}

const Contact = ({ id }: ContactProps) => {
  return (
    <section id={id || "contact"} className="py-16 md:py-24 bg-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-medium mb-6">Get in Touch with Us</h2>
            <p className="text-gray-600 mb-8">
              Have questions about Tobey's Tutor? We're here to help! Get in touch with our team and we'll get back to you as soon as possible.
            </p>
            
            <div className="flex items-center gap-3 mb-6">
              <Mail className="h-6 w-6 text-tobey-orange" />
              <a href="mailto:hello@tobeystutor.com" className="text-tobey-text hover:text-tobey-orange transition-colors">
                hello@tobeystutor.com
              </a>
            </div>
            
            <Button className="btn-primary">
              Schedule a Demo
            </Button>
          </div>
          
          <div>
            <img 
              src="https://images.unsplash.com/photo-1543269865-cbf427effbad" 
              alt="Students learning together" 
              className="rounded-xl shadow-lg w-full h-80 object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
