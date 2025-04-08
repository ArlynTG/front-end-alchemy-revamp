
import { useState } from "react";
import ChatInterface from "@/components/chat/ChatInterface";

const ChatDemo = () => {
  // We'll use a hardcoded API key instead of requiring user input
  const apiKey = ""; // Empty string as we'll handle this in ChatInterface

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
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
