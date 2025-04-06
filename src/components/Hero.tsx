
import React from 'react';

const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-10 items-center mb-12">
          <div className="order-1 md:order-1">
            <img 
              src="/lovable-uploads/6bc5b168-2aed-4e98-bf32-1eb71ed74d5b.png" 
              alt="Student using Tobey's Tutor" 
              className="rounded-xl shadow-lg max-w-full h-auto object-cover"
            />
          </div>
          <div className="order-2 md:order-2">
            <h1 className="text-5xl font-bold mb-4 text-tobey-orange">Tobey's Tutor</h1>
            <h2 className="text-2xl mb-4 text-black flex flex-col">
              <span>Unlock potential.</span>
              <span>Celebrate neurodiversity.</span>
              <span>Transform Learning.</span>
            </h2>
            <p className="text-base text-gray-700">
              As parents, we know what it's like to feel stuck. Watching our children struggle with traditional learning methods can be heartbreaking. We built Tobey's Tutor for kids who learn differently, enabling them to unlock their academic potential, build confidence, find their voice — and have fun too.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="feature-highlight bg-white/80 p-6 rounded-xl shadow-sm">
            <h4 className="font-medium mb-2">Personalized</h4>
            <p className="text-sm text-gray-600">Effective lesson plans can be based on recent school reports, neuropsychological evaluations, and other data.</p>
          </div>
          <div className="feature-highlight bg-white/80 p-6 rounded-xl shadow-sm">
            <h4 className="font-medium mb-2">Adaptive</h4>
            <p className="text-sm text-gray-600">Our patent-pending AI platform uses games and your child's interests to automatically adjust to learning speed, difficulty, and focus level.</p>
          </div>
          <div className="feature-highlight bg-white/80 p-6 rounded-xl shadow-sm">
            <h4 className="font-medium mb-2">Proven</h4>
            <p className="text-sm text-gray-600">Guided by research-backed approaches like Orton Gillingham and structured literacy techniques.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
