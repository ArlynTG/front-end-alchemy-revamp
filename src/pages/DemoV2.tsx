
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import SimpleChatInterface from "@/components/chat/SimpleChatInterface";

const DemoV2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <span className="section-tag block text-left">Try it</span>
            <h2 className="section-title mb-4">
              <strong>Experience Tobey In Action</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Interact directly with our AI tutor through this live demo interface.
            </p>
            
            <Card className="overflow-hidden shadow-xl border-gray-200">
              <CardContent className="p-4">
                <div className="h-[600px]">
                  <SimpleChatInterface />
                </div>
              </CardContent>
            </Card>
            
            <div className="mt-4 text-sm text-gray-500 text-center">
              <p>
                Experience our AI tutor in action. This demo connects directly to our AI service.
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
