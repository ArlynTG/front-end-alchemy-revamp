
import React from 'react';
import { Card } from "@/components/ui/card";
import { Quote } from "lucide-react";

const Story = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-tobey-peach">
      <div className="container max-w-4xl mx-auto">
        <span className="section-tag">Origin Story</span>
        <h2 className="section-title mb-4"><strong>Why We Created Tobey's Tutor</strong></h2>
        <h3 className="text-center text-xl text-gray-600 mb-10 italic">Superheroes and dinosaurs and AI, oh my.</h3>
        
        <div className="prose prose-lg mx-auto text-gray-700">
          <p className="mb-6">
            We created Tobey's Tutor for our son—a bright 11-year-old with dyslexia who inspired both our mission and our name.
          </p>
          
          <div className="float-right ml-8 mb-6 w-64 aspect-square">
            <div className="relative h-full">
              <div className="absolute inset-0 bg-white rounded-lg border-2 border-tobey-orange"></div>
              <Card className="relative h-full flex items-center justify-center p-6 rounded-lg">
                <div className="absolute top-2 left-2 text-tobey-orange">
                  <Quote size={24} />
                </div>
                <div className="absolute bottom-2 right-2 text-tobey-orange transform rotate-180">
                  <Quote size={24} />
                </div>
                <p className="text-base font-medium text-center text-tobey-text italic">
                  "Tobey now voluntarily asks for study time—words we never expected to hear."
                </p>
              </Card>
            </div>
          </div>
          
          <p className="mb-6">
            Like many parents of children with learning differences, we struggled to find effective tools to support his education. When we noticed how Tobey's eyes lit up discussing superheroes, dinosaurs, and Mark Rober's YouTube experiments, we had our breakthrough moment: learning should connect to what already excites our children.
          </p>
          
          <p className="mb-6">
            While no technology replaces great teachers and schools, Tobey's Tutor provides what remains elusive for most families: a personalized learning experience that meets children exactly where they are—addressing specific needs, building confidence, and making education feel relevant to their world.
          </p>

          <p className="mb-6">
            One-on-one tutoring with a trained professional remains the gold standard, but it can cost hundreds of dollars per week—a financial burden many simply cannot shoulder. Our platform delivers personalized learning support at a fraction of that cost, making specialized education accessible to more children who need it.
          </p>

          <div className="mt-8 text-center font-bold text-lg border-t border-b border-gray-300 py-4 px-2">
            Created by parents who understand, for families who need solutions that actually work.
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
