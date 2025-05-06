
import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { usePricing } from "@/components/Pricing";
import { Timer } from "lucide-react";

const Hero = () => {
  const { openEarlyAdopterModal } = usePricing();
  
  return (
    <section className="py-16 md:py-24">
      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div className="order-1 md:order-1 animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <picture>
              <source 
                srcSet="/lovable-uploads/45a8e10f-2156-4234-acf6-9e332b29b756.webp"
                type="image/webp"
              />
              <source
                srcSet="/lovable-uploads/45a8e10f-2156-4234-acf6-9e332b29b756.png"
                type="image/png"
              />
              <img 
                src="/lovable-uploads/45a8e10f-2156-4234-acf6-9e332b29b756.png" 
                alt="Child with curly hair using a tablet in a bright, plant-filled home environment" 
                className="rounded-xl shadow-lg max-w-full h-auto object-cover hover:shadow-xl transition-shadow duration-300"
                width="800"
                height="600"
                loading="eager"
                fetchpriority="high"
              />
            </picture>
          </div>
          <div className="order-2 md:order-2">
            <h1 className="text-5xl font-bold mb-4 text-tobey-orange animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              Tobey's Tutor
            </h1>
            <h2 className="text-2xl mb-4 text-black flex flex-col space-y-2">
              {['Unlock potential.', 'Celebrate neurodiversity.', 'Transform learning.'].map((text, index) => (
                <span 
                  key={index} 
                  className="animate-fade-in opacity-0"
                  style={{ 
                    animationDelay: `${600 + (index * 200)}ms`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {text}
                </span>
              ))}
            </h2>
            <p className="text-base text-gray-700 animate-fade-in opacity-0 mb-6" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
              As parents, we know what it's like to feel stuck. Watching our children struggle with traditional learning methods can be heartbreaking. That's why we built Tobey's Tutor, a patent pending AI system for bright kids with dyslexia, ADHD, and related learning differences. It's designed to help students unlock their academic potential, build confidence, find their voice — and have fun too.
            </p>
            
            <div className="flex flex-wrap gap-4 animate-fade-in opacity-0" style={{ animationDelay: '1400ms', animationFillMode: 'forwards' }}>
              <Button asChild className="bg-tobey-orange hover:bg-tobey-orange/90 text-white">
                <Link to="/demo-v5">Try the Demo</Link>
              </Button>
              <Button 
                onClick={openEarlyAdopterModal}
                variant="outline" 
                className="border-tobey-orange text-tobey-orange hover:bg-tobey-orange/10 flex items-center gap-2"
              >
                Join the Beta for $1
                <Timer className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
