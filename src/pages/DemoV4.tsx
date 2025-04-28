
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { Helmet } from "react-helmet-async";

const DemoV4 = () => {
  const isMobile = useIsMobile();

  // Dynamically set appropriate iframe height based on viewport
  useEffect(() => {
    const setOptimalIframeHeight = () => {
      const viewport = window.innerHeight;
      const headerFooterSpace = 280; // Approximate space for header, footer, margins
      document.documentElement.style.setProperty(
        '--iframe-height', 
        `${Math.max(500, viewport - headerFooterSpace)}px`
      );
    };

    setOptimalIframeHeight();
    window.addEventListener('resize', setOptimalIframeHeight);

    return () => window.removeEventListener('resize', setOptimalIframeHeight);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-tobey-peach/30">
      <Helmet>
        <title>Tobey's Tutor Demo | See How It Works</title>
        <meta name="description" content="Try Tobey's Tutor - Our AI tutor specially designed for bright kids with dyslexia, ADHD, and related learning differences." />
        <meta property="og:title" content="Try Tobey's Tutor Demo" />
        <meta property="og:description" content="Experience our AI tutor designed for bright kids with learning differences like dyslexia and ADHD." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://www.openassistantgpt.io" />
      </Helmet>

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
                <div className={`${isMobile ? 'h-[500px]' : 'var(--iframe-height, 600px)'} overflow-hidden flex justify-center items-center p-4`}>
                  <iframe 
                    src="https://www.openassistantgpt.io/embed/cma0hswmg0007wqm6cgyt5khc/window?chatbox=false"
                    className="w-[100%] h-[100%] border-2 border-gray-200 rounded-md shadow-sm"
                    style={{
                      overflow: 'hidden',
                      maxWidth: '100%',
                      borderRadius: '0.375rem',
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                      fontSize: '18px',
                      display: 'block',
                      margin: '0 auto',
                      padding: '0'
                    }}
                    loading="lazy"
                    title="Tobey's Tutor Interactive Demo"
                    allowFullScreen
                    allow="clipboard-read; clipboard-write"
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

export default DemoV4;
