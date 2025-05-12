
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

interface PricingActions {
  openEarlyAdopterSignup: () => void;
}

/**
 * Hook for accessing pricing actions from anywhere in the app
 */
export const usePricingActions = (): PricingActions => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const openEarlyAdopterSignup = () => {
    // If we're not on the homepage, navigate there first and add a flag in the URL
    if (location.pathname !== '/') {
      window.location.href = '/?openEarlyAdopter=true#pricing';
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
  
  // Check if we have the URL parameter to open the early adopter modal
  useEffect(() => {
    if (location.pathname === '/' && location.search.includes('openEarlyAdopter=true')) {
      // Small delay to ensure the pricing section is fully loaded
      setTimeout(() => {
        openEarlyAdopterSignup();
      }, 300);
    }
  }, [location.pathname, location.search]);
  
  return {
    openEarlyAdopterSignup
  };
};
