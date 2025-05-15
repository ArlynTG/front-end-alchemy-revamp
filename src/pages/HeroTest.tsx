
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
          title={<>What if Dyslexia<br />and ADHD were<br />Superpowers?</>}
          description="Tobey's Tutor transforms learning differences into strengths through AI powered lessons tailored to your child's unique mind."
          detailText="As parents, we know the heartbreak of watching a child struggle with traditional teaching methods. So we built what we couldn't find—game-based lessons that adapt to how our children actually thinks, not how schools expect them to learn. See real progress, celebrate real victories. Register for our Beta today."
        />
      </PricingContext.Provider>
    </div>
  );
};

export default HeroTest;
