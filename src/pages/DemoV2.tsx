
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TobeyChat from "@/components/chat/TobeyChat";

const DemoV2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <span className="section-tag block text-center mb-2">Demo</span>
            <h2 className="section-title text-center mb-4">
              <strong>Chat with Tobey AI</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Experience our AI tutor firsthand. Ask Tobey questions about any subject or learning concept.
            </p>
            
            <div className="max-w-2xl mx-auto h-[600px] shadow-xl rounded-lg overflow-hidden">
              <TobeyChat />
            </div>
            
            <div className="mt-6 text-center text-gray-600 max-w-lg mx-auto">
              <p className="text-sm">
                This demo connects to our AI tutor service. Try asking Tobey about school subjects, learning concepts, or homework help.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DemoV2;
