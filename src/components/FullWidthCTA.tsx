
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FullWidthCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-tobey-blue to-soft-purple text-tobey-text">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              See For Yourself
            </h2>
            <p className="text-lg mb-6 md:pr-12 opacity-90 animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              Try out the demo version of Tobey's Tutor. See how our patent pending AI-powered technology can level up your kids skills in a fun and supportive way. Give it a try, for free!
            </p>
            <Link to="/demo-v5">
              <div className="relative inline-block animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                <Button 
                  size="lg" 
                  className="bg-tobey-orange hover:bg-tobey-darkOrange text-white font-medium transform transition-transform duration-300 hover:scale-105 pl-6 pr-6 flex items-center"
                >
                  Try the Demo Now
                </Button>
              </div>
            </Link>
          </div>
          
          <div className="md:w-1/2 flex justify-center animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
            <div className="overflow-hidden rounded-lg shadow-lg max-w-md hover:shadow-xl transition-shadow duration-300">
              <picture>
                <source 
                  srcSet="/lovable-uploads/db5788fb-881f-44f2-809d-a02ab6acee5c.png"
                  type="image/webp"
                />
                <img 
                  src="/lovable-uploads/db5788fb-881f-44f2-809d-a02ab6acee5c.png" 
                  alt="Parent and child working together on a laptop" 
                  className="w-full h-auto object-cover transform transition-transform duration-300 hover:scale-105"
                  width="600"
                  height="450"
                  loading="lazy"
                />
              </picture>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullWidthCTA;
