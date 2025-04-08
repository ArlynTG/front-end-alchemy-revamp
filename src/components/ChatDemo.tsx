
import React from "react";

const ChatDemo = () => {
  return (
    <section id="demo" className="py-16 md:py-24 bg-white">
      <div className="container">
        <span className="section-tag">FAQ</span>
        
        <h2 className="section-title">Got Questions?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
          Wondering how all this AI works? What's a tutoring session look like? How is progress measured?
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold mb-4">Common Questions</h3>
            <ul className="space-y-4">
              <li>
                <p className="font-medium">How does the AI tutoring work?</p>
                <p className="text-gray-600 mt-1">Our AI tutors adapt to each student's learning style and pace, providing personalized instruction and feedback in real-time.</p>
              </li>
              <li>
                <p className="font-medium">What subjects do you cover?</p>
                <p className="text-gray-600 mt-1">We currently support math, science, language arts, and programming for students in grades K-12.</p>
              </li>
              <li>
                <p className="font-medium">How do you measure progress?</p>
                <p className="text-gray-600 mt-1">We use adaptive assessments to track knowledge gaps and improvements, providing detailed reports to parents and students.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChatDemo;
