
import ChatInterface from "@/components/chat/ChatInterface";

const Demo = () => {
  return (
    <section id="demo-faq" className="py-16 md:py-24 bg-white">
      <div className="container max-w-5xl mx-auto">
        <span className="section-tag mx-auto block w-fit">See It In Action</span>
        <h2 className="section-title mb-4"><strong>Try Tobey's Tutor Now</strong></h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Chat with our AI tutor below to see how our platform can help your child learn through their interests.
        </p>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl mb-16 bg-white border border-gray-200">
          <div className="p-4">
            <ChatInterface />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
