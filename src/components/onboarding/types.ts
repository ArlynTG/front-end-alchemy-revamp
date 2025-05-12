
import { Database } from "@/integrations/supabase/types";

// Updated learning difference type that includes all our values
export type LearningDifference = 
  | 'ADHD'
  | 'Dyslexia'
  | 'Dyscalculia' // Replaced Dysgraphia
  | 'Executive_Functioning'
  | 'Autism'
  | 'Self_Advocacy' // New
  | 'Processing_Speed' // New
  | 'Auditory Processing'; // Existing

export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: string;
  learningDifferences: LearningDifference[];
}

export type OnboardingStep = 
  | "profile" 
  | "learning-differences" 
  | "payment" 
  | "document-upload" 
  | "complete";

export interface DocumentUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  url?: string;
  error?: string;
}
