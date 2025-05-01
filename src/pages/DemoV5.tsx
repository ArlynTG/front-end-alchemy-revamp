
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { Card } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";

const DemoV5 = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-white to-tobey-peach/30">
      <Helmet>
        <title>Tobey's Tutor Demo V5 | Try Our Latest Version</title>
        <meta name="description" content="Experience the latest version of Tobey's Tutor - Our AI tutor specially designed for bright kids with dyslexia, ADHD, and related learning differences." />
        <meta property="og:title" content="Try Tobey's Tutor Demo V5" />
        <meta property="og:description" content="Experience our latest AI tutor designed for bright kids with learning differences like dyslexia and ADHD." />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://tobeys-tutor.your-replit-username.repl.co" />
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
                <div className="flex justify-center items-center p-4">
                  <iframe 
                    src="https://tobeys-tutor.your-replit-username.repl.co" 
                    width="100%" 
                    height="650px" 
                    frameBorder="0"
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
