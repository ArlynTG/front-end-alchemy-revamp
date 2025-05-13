
export type OnboardingStep = "profile" | "learning-differences" | "payment" | "document-upload" | "complete";

export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: string;
  schoolName?: string;
  schoolGrade?: string;
  learningDifferences: LearningDifference[];
}

export type LearningDifference = 
  | 'ADHD'
  | 'Dyslexia'
  | 'Dyscalculia'
  | 'Executive_Functioning'
  | 'Self_Advocacy'
  | 'Processing_Speed'
  | 'Auditory Processing';

// Helper array of all learning differences (useful for Zod schema)
export const ALL_LEARNING_DIFFERENCES: LearningDifference[] = [
  'ADHD',
  'Dyslexia', 
  'Dyscalculia',
  'Executive_Functioning',
  'Self_Advocacy',
  'Processing_Speed',
  'Auditory Processing'
];

export interface DocumentUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
  url?: string;
  file?: File; // Optional file property for uploads in progress
}
