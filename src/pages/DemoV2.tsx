
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DemoV2 = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <section className="py-16 md:py-24 bg-white">
          <div className="container max-w-6xl mx-auto px-4">
            <span className="section-tag block text-left">Demo</span>
            <h2 className="section-title mb-4">
              <strong>Tobey AI Demo</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              This demo page is currently under construction. Please check back later for our interactive demo.
            </p>
            
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-700">
                Our interactive demo is being updated. In the meantime, you can learn more about Tobey AI's features 
                on our homepage.
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
