
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

const DemoV2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <span className="section-tag block text-center mb-2">Demo</span>
            <h2 className="section-title text-center mb-4">
              <strong>Tobey AI Demo</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              Our AI tutor is currently unavailable. Please check back soon for an interactive demo.
            </p>
            
            <div className="max-w-2xl mx-auto h-[600px] shadow-xl rounded-lg overflow-hidden flex items-center justify-center bg-gray-100">
              <p className="text-gray-500 text-center px-4">Demo coming soon</p>
            </div>
            
            <div className="mt-6 text-center text-gray-600 max-w-lg mx-auto">
              <p className="text-sm">
                We're working on an exciting update to our AI tutor service. Stay tuned!
              </p>
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

