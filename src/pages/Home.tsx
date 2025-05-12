
import React from 'react';
import Navbar from '@/components/Navbar';
import Contact from '@/components/Contact';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8">Welcome to Tobey's Tutor</h1>
        <p className="text-center text-lg mb-8">
          AI tutoring transforms learning for bright kids with dyslexia and ADHD.
        </p>
      </div>
      <Contact id="contact" />
    </div>
  );
};

export default Home;
