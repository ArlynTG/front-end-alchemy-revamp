
import { Button } from "@/components/ui/button";

const ChatDemo = () => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">FAQ</span>
        
        <h2 className="section-title">Got Questions?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured? Contact us to learn more!
        </p>
        
        <div className="flex justify-center">
          <Button className="btn-primary" onClick={() => window.location.href = '#contact'}>
            Contact Us
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
