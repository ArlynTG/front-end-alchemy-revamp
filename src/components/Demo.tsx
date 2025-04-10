
import ChatInterface from "@/components/chat/ChatInterface";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Demo = () => {
  return (
    <section id="demo-faq" className="py-16 md:py-24 bg-white">
      <div className="container max-w-5xl mx-auto">
        <span className="section-tag block text-left">Try it</span>
        <h2 className="section-title mb-4"><strong>Got Questions?</strong></h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Wondering how we use AI or want to sample tutoring session? Just ask.
        </p>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl mb-16 bg-white border border-gray-200">
          <div className="p-4">
            <ChatInterface />
          </div>
        </div>
        
        <div className="text-center mt-8">
          <Link to="/demo-v2">
            <Button className="bg-tobey-orange hover:bg-tobey-darkOrange text-white font-medium">
              Try Our Full-Screen Demo
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Demo;
