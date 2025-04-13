
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FullWidthCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Try Tobey AI Tutor Today
            </h2>
            <p className="text-lg mb-6 md:pr-12 text-white/90">
              Experience our AI tutor firsthand. Ask questions about any subject, 
              get help with homework, or explore new concepts with Tobey, our 
              intelligent and supportive AI learning companion.
            </p>
            <Link to="/demo-v2">
              <Button 
                size="lg" 
                className="bg-white hover:bg-gray-100 text-indigo-700 font-medium"
              >
                Try Demo Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-full flex items-center justify-center p-2 backdrop-blur-sm">
              <div className="w-full h-full bg-white/30 rounded-full flex items-center justify-center p-2">
                <div className="w-full h-full bg-white/40 rounded-full flex items-center justify-center text-center p-6">
                  <span className="text-xl md:text-2xl font-bold">Experience Tobey</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullWidthCTA;
