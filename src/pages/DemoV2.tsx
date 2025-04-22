
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import WebhookChat from "@/components/chat/WebhookChat";
import { Card } from "@/components/ui/card";

const DemoV2 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-tobey-peach/30">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24">
          <div className="container max-w-6xl mx-auto px-4">
            <span className="section-tag block text-center mb-2 animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Interactive Demo
            </span>
            <h2 className="section-title text-center mb-4 animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              <strong>See How Tobey's Tutor Works</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              Curious if this could help your child? Chat with our AI tutor and get a feel for how we support bright kids with dyslexia, ADHD, and learning differences—one smart, personalized step at a time.
            </p>
            
            <div className="max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              <Card className="shadow-xl rounded-xl border border-gray-200/50 backdrop-blur-sm bg-white/90 hover:shadow-2xl transition-all duration-300">
                <div className="h-[600px] overflow-hidden">
                  <WebhookChat />
                </div>
              </Card>
              
              <div className="mt-8 text-center text-gray-600 max-w-lg mx-auto space-y-4 animate-fade-in opacity-0" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
                <p className="text-sm bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-100">
                  This is a live demo of our AI tutor service. Try asking Tobey about:
                  <br />
                  🎯 School subjects and concepts
                  <br />
                  📚 Homework help and explanations
                  <br />
                  🤔 Learning strategies and study tips
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default DemoV2;
