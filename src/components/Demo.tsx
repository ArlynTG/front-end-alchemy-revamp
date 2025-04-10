import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ChatInterface from "@/components/chat/ChatInterface";

const faqData = [
  {
    question: "How does Tobey's Tutor actually work?",
    answer: "Tobey's Tutor uses advanced AI technology to create personalized learning sessions based on your child's interests. The system adapts to their learning style, connects academic subjects to topics they already love, and provides targeted support for areas where they need help."
  },
  {
    question: "Is this meant to replace my child's teachers?",
    answer: "Absolutely not! Tobey's Tutor is designed to complement classroom learning, not replace it. We work alongside teachers and schools to reinforce concepts, provide additional practice, and make learning more engaging by connecting it to your child's interests."
  },
  {
    question: "How is this different from other educational apps?",
    answer: "Unlike generic learning apps, Tobey's Tutor personalizes content around your child's specific interests and learning needs. Instead of pre-made content, our AI creates custom learning experiences that connect academic concepts to topics your child already loves - whether that's dinosaurs, superheroes, or anything else they're passionate about."
  },
  {
    question: "What age groups is this appropriate for?",
    answer: "Our current beta program is optimized for children ages 8-13, but we're working to expand this range. The platform is especially effective for students with learning differences like dyslexia, ADHD, or those who simply struggle to engage with traditional educational methods."
  },
  {
    question: "Do you have evidence that this approach works?",
    answer: "Yes! Our approach is grounded in educational research on interest-based learning. Our initial testing showed significant improvements in engagement times and knowledge retention. During our beta phase, we'll be collecting more data to quantify these benefits further."
  },
  {
    question: "What does the beta program include?",
    answer: "Beta users get early access to our platform, personalized onboarding, regular updates as we add features, and the opportunity to shape the future of the product through feedback. As an Early Adopter, you'll receive special pricing that will be locked in when we officially launch."
  }
];

const Demo = () => {
  return (
    <section id="demo-faq" className="py-16 md:py-24 bg-white">
      <div className="container max-w-5xl mx-auto">
        <span className="section-tag mx-auto block w-fit">See It In Action</span>
        <h2 className="section-title mb-4"><strong>Try Tobey's Tutor Now</strong></h2>
        <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
          Chat with our AI tutor below to see how our platform can help your child learn through their interests.
        </p>
        
        <div className="relative rounded-xl overflow-hidden shadow-xl mb-16 bg-white border border-gray-200">
          <div className="p-4">
            <ChatInterface />
          </div>
        </div>
        
        {/* FAQ Section */}
        <div className="mt-16">
          <span className="section-tag mx-auto block w-fit">FAQ</span>
          <h2 className="section-title mb-4"><strong>Frequently Asked Questions</strong></h2>
          <p className="text-center text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Everything you need to know about Tobey's Tutor and our beta program.
          </p>
          
          <Accordion type="single" collapsible className="w-full">
            {faqData.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-lg font-medium text-left">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default Demo;
