
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";

const DemoV4 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-tobey-peach/30">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-4">
            <h2 className="section-title text-center mb-4 animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              <strong>See How Tobey's Tutor Works</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              Curious if this could help your child? Chat with our patent pending AI tutor and get a feel for how we support bright kids with dyslexia, ADHD, and related learning differences—one smart, personalized step at a time.
            </p>
            
            <div className="max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              <Card className="shadow-xl rounded-xl border border-gray-200/50 backdrop-blur-sm bg-gradient-to-br from-white to-tobey-peach/30 hover:shadow-2xl transition-all duration-300">
                <div className="h-[600px] overflow-hidden flex justify-center items-center p-4">
                  <iframe 
                    src="https://www.openassistantgpt.io/embed/cma0hswmg0007wqm6cgyt5khc/window?chatbox=false"
                    className="w-[95%] h-[75vh] border-2 border-gray-200 rounded-md shadow-sm"
                    style={{
                      overflow: 'hidden',
                      maxWidth: '100%',
                      borderRadius: '0.375rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      fontSize: '18px',
                      display: 'block',
                      margin: '0 auto',
                      padding: '10px'
                    }}
                    allowFullScreen
                    allow="clipboard-read; clipboard-write"
                  />
                  {/* This chatbot is built using https://openassistantgpt.io/ */}
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default DemoV4;
