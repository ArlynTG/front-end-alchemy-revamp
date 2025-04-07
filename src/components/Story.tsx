import React from 'react';

const Story = () => {
  return (
    <section id="story" className="py-16 md:py-24 bg-tobey-peach">
      <div className="container max-w-4xl mx-auto">
        <span className="section-tag">Origin Story</span>
        <h2 className="section-title mb-4"><strong>Why We Created Tobey's Tutor</strong></h2>
        <h3 className="text-center text-xl text-gray-600 mb-10 italic">Superheroes, dinosaurs, and AI. Oh My.</h3>
        
        <div className="prose prose-lg mx-auto text-gray-700">
          <p className="mb-6">
            We created Tobey's Tutor as a practical solution for our son Tobey—a bright 11-year-old with dyslexia who inspired both our mission and our name.
          </p>
          
          <p className="mb-6">
            Like many parents of children with learning differences, we searched for effective tools to support his education. Seeing his natural curiosity about superheroes, dinosaurs, and YouTube's Mark Rober, we developed a tutoring system that connects learning to his genuine interests.
          </p>
          
          <p className="mb-6">
            By thoughtfully integrating his passions into structured learning sessions, we've created a tool that makes academic progress both effective and engaging—leading Tobey to voluntarily ask for study time.
          </p>
          
          <p className="mb-6">
            While no technology replaces great teachers and well-run schools, Tobey's Tutor offers what is sadly difficult for most families to find: a personalized learning experience that meets children where they are—addressing specific needs, building confidence, and making education feel relevant to their world.
          </p>
          
          <p className="mb-8 text-right">
            —Arlyn Gajilan & Robin Winn
          </p>
        </div>
      </div>
    </section>
  );
};

export default Story;
