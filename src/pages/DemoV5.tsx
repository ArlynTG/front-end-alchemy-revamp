
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";

const DemoV5 = () => {
  const isMobile = useIsMobile();
  
  // Set document title and metadata when component mounts
  useEffect(() => {
    document.title = "Tobey's Tutor: AI Learning Assistant for Dyslexia & ADHD | Demo";
    
    // Update meta tags
    const updateMetaTag = (name, content) => {
      let metaTag = document.querySelector(`meta[${name.includes(':') ? 'property' : 'name'}="${name}"]`);
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (name.includes(':')) {
          metaTag.setAttribute('property', name);
        } else {
          metaTag.setAttribute('name', name);
        }
        document.head.appendChild(metaTag);
      }
      metaTag.setAttribute('content', content);
    };

    updateMetaTag('description', 'AI-enabled tutoring for dyslexic & ADHD students that boosts academic grades, skills and confidence.');
    updateMetaTag('og:title', 'Tobey\'s Tutor: AI Learning Assistant for Dyslexia & ADHD | Demo');
    updateMetaTag('og:description', 'AI-enabled tutoring for dyslexic & ADHD students that boosts academic grades, skills and confidence.');
    updateMetaTag('og:type', 'website');

    // Cleanup function to restore original title when component unmounts
    return () => {
      document.title = 'Tobey\'s Tutor';
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-tobey-peach/30">
      <Navbar />
      <main className="flex-grow flex flex-col justify-center">
        <section className={`py-8 md:py-16 flex flex-col flex-grow justify-center ${isMobile ? 'px-0' : ''}`}>
          <div className={`container mx-auto ${isMobile ? 'px-2' : 'px-4 max-w-6xl'}`}>
            {!isMobile && (
              <>
                <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
                  See How Tobey's Tutor Works
                </h1>
                
                <p className="text-center text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
                  Curious if this could help your child? Chat with our patent pending AI tutor and get a feel for how we support bright kids with dyslexia, ADHD, and related learning differences—one smart, personalized step at a time.
                </p>
              </>
            )}
            
            <div className={`mx-auto animate-fade-in opacity-0 ${isMobile ? 'w-full' : 'max-w-3xl'}`} style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>              
              <Card className={`overflow-hidden ${isMobile ? 'rounded-3xl shadow-sm bg-white/90 h-full' : 'rounded-2xl shadow-md bg-white'}`}>
                <iframe 
                  src="https://tutor-assistant-arlyn11.replit.app/"
                  style={{
                    width: "100%", 
                    height: isMobile ? "calc(100vh - 96px)" : "700px", 
                    border: "none",
                    display: "block"
                  }}
                  title="Tobey's Tutor Demo"
                  allow="microphone; camera"
                />
              </Card>
            </div>
          </div>
        </section>
      </main>
      {!isMobile && <Footer />}
      <Toaster />
    </div>
  );
};

export default DemoV5;
