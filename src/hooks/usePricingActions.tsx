
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface PricingActions {
  openEarlyAdopterSignup: () => void;
}

/**
 * Hook for accessing pricing actions from anywhere in the app
 */
export const usePricingActions = (): PricingActions => {
  const location = useLocation();
  
  const openEarlyAdopterSignup = () => {
    // If we're not on the homepage, navigate there first
    if (location.pathname !== '/') {
      window.location.href = '/#pricing';
      return;
    }
    
    // Scroll to pricing section
    const pricingSection = document.getElementById('pricing');
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
      
      // Find the early adopter card and trigger its button
      setTimeout(() => {
        const earlyAdopterCard = document.querySelector('[data-plan-id="early-adopter"]');
        if (earlyAdopterCard) {
          const button = earlyAdopterCard.querySelector('button');
          if (button) {
            button.click();
          }
        }
      }, 500); // Small delay to allow for scrolling
    }
  };
  
  return {
    openEarlyAdopterSignup
  };
};
