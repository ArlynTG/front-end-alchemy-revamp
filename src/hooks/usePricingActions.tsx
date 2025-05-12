
import { useNavigate } from 'react-router-dom';

export const usePricingActions = () => {
  const navigate = useNavigate();

  const openEarlyAdopterSignup = () => {
    // Find the pricing section
    const pricingSection = document.getElementById('pricing');
    
    // If we're on the homepage and find the pricing section, scroll to it
    if (pricingSection) {
      pricingSection.scrollIntoView({ behavior: 'smooth' });
      
      // Add small delay to ensure scrolling is complete
      setTimeout(() => {
        // Find the early adopter card and trigger its button
        const earlyAdopterCard = document.querySelector('[data-plan-id="early-adopter"]');
        if (earlyAdopterCard) {
          const button = earlyAdopterCard.querySelector('button');
          if (button) {
            button.click();
          }
        }
      }, 500);
    } else {
      // Navigate to homepage with pricing anchor
      navigate('/#pricing');
    }
  };

  return {
    openEarlyAdopterSignup
  };
};
