
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const FullWidthCTA = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-tobey-blue to-soft-purple text-tobey-text">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              See for yourself
            </h2>
            <p className="text-lg mb-6 md:pr-12 opacity-90">
              Try out the demo version of Tobey's Tutor. See how we use AI to level up your kids skills in a fun and supportive way. Give it a try.
            </p>
            <Link to="/demo-v2">
              <Button 
                size="lg" 
                className="bg-tobey-orange hover:bg-tobey-darkOrange text-white font-medium"
              >
                Try Demo Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          
          <div className="md:w-1/2 flex justify-center">
            <div className="overflow-hidden rounded-lg shadow-lg max-w-md">
              <img 
                src="/lovable-uploads/1b86da3b-ff93-415c-8e19-83faac71e21f.png" 
                alt="Parent and child using Tobey AI Tutor" 
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FullWidthCTA;
