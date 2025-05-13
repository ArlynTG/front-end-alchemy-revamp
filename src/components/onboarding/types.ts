
// Learning difference types that match Supabase enum
export type LearningDifference = 
  | "ADHD"
  | "Dyslexia" 
  | "Dyscalculia"
  | "Auditory Processing"
  | "Executive_Functioning"
  | "Self_Advocacy"
  | "Processing_Speed";

export const ALL_LEARNING_DIFFERENCES: LearningDifference[] = [
  "ADHD",
  "Dyslexia",
  "Dyscalculia",
  "Auditory Processing",
  "Executive_Functioning", 
  "Self_Advocacy",
  "Processing_Speed"
];

// Onboarding step types
export type OnboardingStep = 
  | "profile" 
  | "learning-differences" 
  | "payment" 
  | "document-upload" 
  | "complete";

// Form values for onboarding process
export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: string;
  school: string;
  grade: string;
  learningDifferences: LearningDifference[];
}

// Types for achievements and badges system
export interface Achievement {
  id: string;
  name: string;
  description: string;
  iconName: string;
  unlockedAt?: string;
  progress?: number;
  maxProgress?: number;
}

// Types for student data
export interface StudentBasicInfo {
  firstName: string;
  lastName: string;
  age: number;
  grade: string;
  school: string;
}
