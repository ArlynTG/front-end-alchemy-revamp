
import React from 'react';
import Hero from '@/components/Hero';
import { PricingContext } from '@/components/Pricing';

const HeroTest = () => {
  // Create a mock pricing context with the necessary functions
  const pricingValue = {
    openEarlyAdopterModal: () => {
      console.log("Early adopter modal would open here");
      // No actual implementation needed for this test page
    }
  };

  return (
    <div className="min-h-screen">
      <PricingContext.Provider value={pricingValue}>
        <Hero 
          title="What if Dyslexia and ADHD were superpowers?"
          description="Tobey's Tutor turns different brains into brilliant ones with AI-powered lessons that improve grades, skills, and confidence in as little as 20 minutes a day."
          detailText="As parents, we know what it's like to feel stuck. Watching our children struggle with traditional learning methods can be heartbreaking. Our patent-pending AI builds daily, game-like lessons around what your child already loves, adjusts in real time, and tracks progress you can see. Less frustration, more "I did it!""
        />
      </PricingContext.Provider>
    </div>
  );
};

export default HeroTest;
