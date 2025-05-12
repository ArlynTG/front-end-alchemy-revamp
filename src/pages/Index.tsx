
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks"; 
import Features from "@/components/Features";
import ParentDashboardPreview from "@/components/ParentDashboardPreview";
import StudentDashboardPreview from "@/components/StudentDashboardPreview";
import Story from "@/components/Story";
import FAQ from "@/components/FAQ";
import FullWidthCTA from "@/components/FullWidthCTA";
import Pricing, { PricingContext } from "@/components/Pricing";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { createContext } from "react";

const Index = () => {
  // Create a pricing context value 
  const pricingProps = {
    openEarlyAdopterModal: () => {
      // Find the pricing section and scroll to it
      const pricingSection = document.getElementById('pricing');
      if (pricingSection) {
        pricingSection.scrollIntoView({ behavior: 'smooth' });
        
        // Small delay to ensure the section is fully scrolled into view
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
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <PricingContext.Provider value={pricingProps}>
          <Hero />
          <HowItWorks /> 
          <Features />
          <ParentDashboardPreview />
          <StudentDashboardPreview />
          <Story />
          <FAQ />
          <FullWidthCTA />
          <Pricing />
          <Contact id="contact" />
        </PricingContext.Provider>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
