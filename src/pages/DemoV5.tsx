
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";

const DemoV5 = () => {
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

    updateMetaTag('description', 'AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential.');
    updateMetaTag('og:title', 'Tobey\'s Tutor: AI Learning Assistant for Dyslexia & ADHD | Demo');
    updateMetaTag('og:description', 'AI tutoring transforms learning for bright kids with dyslexia and ADHD. Our evidence-based approach celebrates neurodiversity while unlocking academic potential.');
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
        <section className="py-8 md:py-16 flex flex-col flex-grow justify-center">
          <div className="container max-w-6xl mx-auto px-4">
            <h1 className="text-3xl md:text-4xl font-bold text-center mb-4 animate-fade-in opacity-0" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              See How Tobey's Tutor Works
            </h1>
            
            <p className="text-center text-lg md:text-xl text-gray-600 mb-8 md:mb-10 max-w-2xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }}>
              Curious if this could help your child? Chat with our patent pending AI tutor and get a feel for how we support bright kids with dyslexia, ADHD, and related learning differences—one smart, personalized step at a time.
            </p>
            
            <div className="max-w-3xl mx-auto animate-fade-in opacity-0" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>              
              <Card className="shadow-xl rounded-xl border border-gray-200/50 backdrop-blur-sm bg-gradient-to-br from-white to-tobey-peach/30 hover:shadow-2xl transition-all duration-300">
                <div className="flex justify-center items-center p-4">
                  <iframe 
                    src="https://tutor-assistant-arlyn11.replit.app/"
                    style={{width: "100%", height: "650px", border: "none"}}
                    title="Tobey's Tutor Demo"
                    allow="microphone; camera"
                  />
                </div>
              </Card>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
};

export default DemoV5;
