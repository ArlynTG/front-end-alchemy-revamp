
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

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
              <CardContent className="p-0 aspect-video">
                <iframe 
                  src="https://tobiasedtech.app.n8n.cloud/webhook/eb528532-1df2-4d01-924e-69fb7b29dc25/chat" 
                  className="w-full h-full min-h-[600px]"
                  title="Tobey AI Demo"
                  allow="microphone"
                  loading="lazy"
                ></iframe>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DemoV2;
