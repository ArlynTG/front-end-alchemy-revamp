
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
        <Hero />
      </PricingContext.Provider>
    </div>
  );
};

export default HeroTest;
