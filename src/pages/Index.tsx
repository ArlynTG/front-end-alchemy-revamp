
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

const Index = () => {
  // Get the pricing context value from the Pricing component
  // by creating a wrapper component
  const PricingWrapper = () => {
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
      <PricingContext.Provider value={pricingProps}>
        <Hero 
          title={<>What if Dyslexia<br />and ADHD were<br />Superpowers?</>}
          description="Tobey's Tutor uses the latest AI to create academic goals and lessons tailored to your child's unique mind."
          detailText="As parents, we know the heartbreak of watching a child struggle with traditional teaching methods. So we built what we couldn't find—patent-pending, game-based lessons that adapt to how our children actually think, not how schools expect them to learn. See real progress, celebrate real victories. Register for our Beta today."
        />
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
    );
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main>
        <PricingWrapper />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
