
import React from 'react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div className="order-1">
            <img 
              src="/lovable-uploads/8df52e8d-0803-4596-8495-7a39f9479a72.png" 
              alt="Student using Tobey's Tutor" 
              className="rounded-xl shadow-lg max-w-full object-cover"
            />
          </div>
          <div className="order-2">
            <h1 className="text-4xl font-medium leading-tight mb-4">
              Tobey's Tutor
              <span className="block text-3xl mt-2">
                As parents, we know what it's like to feel stuck. Watching our children struggle with traditional learning methods can be heartbreaking. We built Tobey's Tutor for kids who learn differently, enabling them to unlock their academic potential, build confidence, find their voice — and have fun too.
              </span>
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="feature-highlight bg-white/80 p-6 rounded-xl shadow-sm">
            <h4 className="font-medium mb-2">Personalized Learning</h4>
            <p className="text-sm text-gray-600">Adapts to your unique learning style and needs in real-time</p>
          </div>
          <div className="feature-highlight bg-white/80 p-6 rounded-xl shadow-sm">
            <h4 className="font-medium mb-2">AI-Powered Tools</h4>
            <p className="text-sm text-gray-600">Smart technology that makes reading and writing easier and more enjoyable</p>
          </div>
          <div className="feature-highlight bg-white/80 p-6 rounded-xl shadow-sm">
            <h4 className="font-medium mb-2">Confidence Building</h4>
            <p className="text-sm text-gray-600">Focuses on strengths and builds self-esteem through positive reinforcement</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

