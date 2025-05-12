
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import { LearningDifference } from "./types";

interface LearningDifferencesFormProps {
  selectedDifferences: LearningDifference[];
  onSubmit: (differences: LearningDifference[]) => void;
  onBack: () => void;
}

const availableDifferences: { value: LearningDifference; label: string; description: string }[] = [
  { 
    value: "Dyslexia", 
    label: "Dyslexia", 
    description: "Difficulty with reading, spelling, and decoding words" 
  },
  { 
    value: "ADHD", 
    label: "ADHD", 
    description: "Challenges with attention, focus, and impulse control" 
  },
  { 
    value: "Dyscalculia", 
    label: "Dyscalculia", 
    description: "Difficulty understanding numbers and learning math concepts" 
  },
  { 
    value: "Auditory Processing", 
    label: "Auditory Processing", 
    description: "Difficulty processing and interpreting auditory information" 
  },
  { 
    value: "Executive Function", 
    label: "Executive Function", 
    description: "Challenges with planning, organizing, and completing tasks" 
  },
  { 
    value: "Self Advocacy", 
    label: "Self Advocacy", 
    description: "Difficulty communicating needs and seeking appropriate support" 
  },
  { 
    value: "Processing Speed", 
    label: "Processing Speed", 
    description: "Takes longer to process information and respond to it" 
  },
  { 
    value: "Other", 
    label: "Other", 
    description: "Other learning differences not listed above" 
  },
];

const LearningDifferencesForm = ({ 
  selectedDifferences = [],
  onSubmit, 
  onBack 
}: LearningDifferencesFormProps) => {
  const [differences, setDifferences] = useState<LearningDifference[]>(selectedDifferences);

  const toggleDifference = (difference: LearningDifference) => {
    if (differences.includes(difference)) {
      setDifferences(differences.filter(d => d !== difference));
    } else {
      if (differences.length < 4) {
        setDifferences([...differences, difference]);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(differences);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Learning Differences</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select up to 4 learning differences that apply to your child, in order of priority.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {availableDifferences.map((difference) => {
            const isSelected = differences.includes(difference.value);
            const position = differences.indexOf(difference.value) + 1;
            
            return (
              <div 
                key={difference.value}
                className={`
                  relative rounded-lg border p-4 cursor-pointer transition-all
                  ${isSelected 
                    ? "border-tobey-orange bg-orange-50 ring-1 ring-tobey-orange" 
                    : "border-gray-200 hover:border-gray-300"}
                `}
                onClick={() => toggleDifference(difference.value)}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 flex items-center justify-center w-6 h-6 rounded-full bg-tobey-orange text-white text-xs font-semibold">
                    {position}
                  </div>
                )}
                <h3 className="text-base font-medium text-gray-900">{difference.label}</h3>
                <p className="mt-1 text-sm text-gray-500">{difference.description}</p>
              </div>
            );
          })}
        </div>
        
        {differences.length > 0 && (
          <div className="mt-6 bg-blue-50 border border-blue-200 rounded-md p-4">
            <h4 className="text-sm font-medium text-blue-800">Selected differences in priority order:</h4>
            <ul className="mt-2 space-y-1">
              {differences.map((difference, index) => {
                const item = availableDifferences.find(d => d.value === difference);
                return (
                  <li key={difference} className="flex items-center text-sm text-blue-700">
                    <span className="w-5 text-center mr-2">{index + 1}.</span> 
                    {item?.label}
                    <button 
                      type="button" 
                      className="ml-2 text-blue-500 hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDifference(difference);
                      }}
                    >
                      <X size={14} />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        <div className="flex justify-between mt-8">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onBack}
          >
            Back to Profile
          </Button>
          <Button 
            type="submit"
            disabled={differences.length === 0}
          >
            Continue to Payment
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LearningDifferencesForm;
