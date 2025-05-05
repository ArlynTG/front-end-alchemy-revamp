
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Plus } from "lucide-react";

const FAQ = () => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container max-w-4xl mx-auto">
        <span className="section-tag">FAQ</span>
        <h2 className="section-title mb-10">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>What makes Tobey's Tutor different from other online tutoring programs?</span>
              <Plus className="h-5 w-5 shrink-0 text-tobey-orange transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Tobey's Tutor is built specifically for kids with dyslexia, ADHD, and executive functioning challenges. 
              Unlike traditional tutoring platforms, our AI-powered system adapts in real-time to your child's 
              needs—offering personalized lessons, self-advocacy coaching, and gamified progress tracking. 
              It's designed by parents, educators, and learning specialists to support bright kids who learn differently.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>Is Tobey's Tutor based on Orton-Gillingham or other proven methods for dyslexic learners?</span>
              <Plus className="h-5 w-5 shrink-0 text-tobey-orange transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Yes. While Tobey's Tutor is not a direct replacement for structured Orton-Gillingham instruction, 
              it integrates its core principles—like multisensory engagement, repetition, and phonics-based 
              reading support. Our lessons align with research-backed strategies for helping students with 
              language-based learning differences thrive.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>What age group is Tobey's Tutor best for?</span>
              <Plus className="h-5 w-5 shrink-0 text-tobey-orange transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Tobey's Tutor is ideal for children ages 8 to 13 who already know how to read but need help 
              with reading fluency, comprehension, writing structure, math reasoning, and executive functioning skills. 
              A future version will offer Orton-Gillingham-style support for younger students aged 5 to 7.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>How do I know if this will help my child with ADHD or dyslexia?</span>
              <Plus className="h-5 w-5 shrink-0 text-tobey-orange transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              If your child is bright but struggles with focus, reading fluency, writing structure, or task completion, 
              Tobey's Tutor can help. Our AI tutor tracks progress over time, adjusts difficulty automatically, 
              and even encourages self-advocacy—skills many kids with ADHD and dyslexia need to succeed in school and beyond.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>What happens after I reserve a beta spot for $1?</span>
              <Plus className="h-5 w-5 shrink-0 text-tobey-orange transition-transform duration-300 group-data-[state=open]:rotate-45" />
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Once you reserve your beta spot, you'll get early access to Tobey's Tutor in June. 
              Before launch, we'll email you a short onboarding form to customize your child's learning experience. 
              Your $1 will be applied toward the first month of your Early Adopter Subscription ($29/month after launch).
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
