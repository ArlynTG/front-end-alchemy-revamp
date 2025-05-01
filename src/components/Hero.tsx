
import React from 'react';
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div className="order-1 md:order-1 animate-fade-in opacity-0" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
            <img 
              src="/lovable-uploads/6bc5b168-2aed-4e98-bf32-1eb71ed74d5b.png" 
              alt="Student using Tobey's Tutor" 
              className="rounded-xl shadow-lg max-w-full h-auto object-cover hover:shadow-xl transition-shadow duration-300"
            />
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
            <p className="text-base text-gray-700 animate-fade-in opacity-0" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
              As parents, we know what it's like to feel stuck. Watching our children struggle with traditional learning methods can be heartbreaking. That's why we built Tobey's Tutor, a patent pending AI system for bright kids with dyslexia, ADHD, and related learning differences. It's designed to help students unlock their academic potential, build confidence, find their voice — and have fun too.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {['Personalized', 'Adaptive', 'Proven'].map((title, index) => (
            <div 
              key={title}
              className="feature-highlight bg-gradient-to-br from-white to-tobey-peach/60 p-6 rounded-xl shadow-sm relative overflow-hidden backdrop-blur-sm hover:transform hover:scale-105 transition-all duration-300 animate-fade-in opacity-0"
              style={{ 
                animationDelay: `${1400 + (index * 200)}ms`,
                animationFillMode: 'forwards'
              }}
            >
              <div className="relative z-10">
                <h4 className="font-medium mb-2">{title}</h4>
                <p className="text-sm text-gray-600">{title === 'Personalized' ? 'Tailored lesson plans using school reports, neuropsychological evaluations, and performance data to target individual learning needs' : title === 'Adaptive' ? 'Our patent pending AI platform uses engaging games tailored to your child\'s interests to automatically adjust difficulty, pace, and focus based on real-time performance' : 'Research-backed methodologies including Orton Gillingham and structured literacy techniques inform our comprehensive learning approach'}</p>
              </div>
              <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-tobey-peach rounded-full opacity-40 blur-md"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
