
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
              <strong>Tobey AI Experience</strong>
            </h2>
            <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
              This page is currently under development. Please check back later for our interactive demo.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DemoV2;
