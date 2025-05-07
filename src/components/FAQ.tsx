
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 bg-white">
      <div className="container max-w-4xl mx-auto">
        <span className="section-tag">FAQ</span>
        <h2 className="section-title mb-10">Frequently Asked Questions</h2>
        
        <Accordion type="single" collapsible className="space-y-4">
          <AccordionItem value="item-1" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>What makes Tobey's Tutor different from other online tutoring programs for children with dyslexia and ADHD?</span>
              <span className="text-orange-500 text-xl transform transition-transform duration-300 group-data-[state=open]:rotate-45">+</span>
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Tobey's Tutor was created specifically for bright children who learn differently, including those with dyslexia, ADHD, and executive functioning challenges. We understand the frustration many families experience when traditional learning approaches don't work for their child. Our AI-powered adaptive learning system continuously responds to your child's unique learning style, offering personalized lessons that build confidence through strengths while supportively addressing challenges. Developed by a collaborative team of parents who've walked in your shoes, specialized educators, and learning disability experts, Tobey's Tutor provides the individualized support that helps these remarkable children unlock their full potential.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>Does Tobey's Tutor use Orton-Gillingham and evidence-based methods for dyslexia intervention?</span>
              <span className="text-orange-500 text-xl transform transition-transform duration-300 group-data-[state=open]:rotate-45">+</span>
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Absolutely. While Tobey's Tutor complements rather than replaces comprehensive Orton-Gillingham instruction, our program thoughtfully integrates the core principles that make O-G so effective for dyslexic learners—including multisensory engagement, structured repetition, and systematic phonics-based reading support. Every aspect of our program aligns with research-validated strategies that help students with language-based learning differences build skills and confidence. Our dyslexia-friendly approach uses techniques proven to improve reading fluency, comprehension, and writing skills for children who learn differently.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>What age group benefits most from Tobey's Tutor's specialized ADHD and dyslexia support?</span>
              <span className="text-orange-500 text-xl transform transition-transform duration-300 group-data-[state=open]:rotate-45">+</span>
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Tobey's Tutor currently provides optimal support for children ages 8 to 16 with dyslexia and ADHD who have basic reading skills but struggle with reading fluency, comprehension, writing organization, math reasoning, or executive functioning skills like planning and time management. We're especially helpful during the critical "reading to learn" transition years when academic demands increase. For parents of younger children with dyslexia (ages 5-7), we're developing a specialized early literacy module incorporating structured Orton-Gillingham principles, coming soon.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>How does Tobey's Tutor use assistive technology like text-to-speech and speech-to-text for dyslexic students?</span>
              <span className="text-orange-500 text-xl transform transition-transform duration-300 group-data-[state=open]:rotate-45">+</span>
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Tobey's Tutor integrates powerful assistive technologies that remove barriers for children who struggle with typing and reading text. Our built-in text-to-speech functionality allows students with dyslexia and ADHD to hear instructions, lesson content, and their own writing read aloud—activating auditory learning pathways that are often stronger in dyslexic learners. The speech-to-text capabilities enable students with learning differences to express their ideas verbally and see them appear as text, bypassing the frustration many experience when trying to type their thoughts. These digital accommodations aren't just conveniences—they're essential tools that level the playing field, allowing bright minds to demonstrate their true understanding without being limited by reading or writing challenges. By providing these assistive technologies directly within our adaptive learning platform, we help students develop self-advocacy skills around requesting similar accommodations in classroom settings.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>How can I tell if Tobey's Tutor will help my child struggling with ADHD or dyslexia?</span>
              <span className="text-orange-500 text-xl transform transition-transform duration-300 group-data-[state=open]:rotate-45">+</span>
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              If you see a bright, creative child who struggles to show what they know through traditional schoolwork, Tobey's Tutor may be exactly what they need. Our program particularly helps children who find reading laborious due to dyslexia, have trouble organizing their thoughts in writing, struggle to maintain focus with ADHD, or feel overwhelmed by multi-step assignments. Beyond academic support, we emphasize building self-awareness and self-advocacy—essential life skills that help children understand their learning differences and communicate their needs effectively. With as little as 20-30 minutes for 3 days a week, Tobey's Tutor students are likely to experience increased confidence and reduced frustration within a month or two.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="bg-tobey-blue/20 rounded-2xl p-4 border-none shadow-sm transition-all duration-300 hover:shadow-md">
            <AccordionTrigger className="text-lg font-bold text-tobey-text hover:text-tobey-orange transition-colors group flex justify-between w-full text-left">
              <span>What happens after I reserve a beta spot for Tobey's Tutor dyslexia and ADHD learning support?</span>
              <span className="text-orange-500 text-xl transform transition-transform duration-300 group-data-[state=open]:rotate-45">+</span>
            </AccordionTrigger>
            <AccordionContent className="text-base text-gray-600 pt-2 transition-all duration-300 data-[state=open]:animate-fade-in">
              Securing your $1 beta reservation gives your family priority access when Tobey's Tutor launches in June. Before launch day, you'll receive a thoughtfully designed onboarding questionnaire to help us customize your child's learning experience to their specific needs, interests, and learning challenges related to dyslexia or ADHD. Your reservation fee will be applied toward your first month of our Early Adopter Subscription ($29/month after launch), giving you significant savings compared to future pricing. Most importantly, you'll be giving your child earlier access to specialized learning tools designed specifically for dyslexia and ADHD that can transform their relationship with learning and academic success.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;
