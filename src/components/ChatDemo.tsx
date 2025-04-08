
import { useState } from "react";
import ChatInterface from "@/components/chat/ChatInterface";
import ChatApiKeySection from "@/components/chat/ChatApiKeySection";

const ChatDemo = () => {
  const [apiKey, setApiKey] = useState<string>("");

  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">FAQ</span>
        
        <h2 className="section-title">Got Questions?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-6">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured?
        </p>
        
        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          <ChatInterface apiKey={apiKey} />
          <div className="p-4 border-t border-gray-200 bg-white">
            <ChatApiKeySection apiKey={apiKey} setApiKey={setApiKey} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
