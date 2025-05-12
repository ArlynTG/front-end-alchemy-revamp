
import { Database } from "@/integrations/supabase/types";

// Updated learning difference type that includes all our values except Autism
export type LearningDifference = 
  | 'ADHD'
  | 'Dyslexia'
  | 'Dyscalculia'
  | 'Executive_Functioning'
  | 'Self_Advocacy'
  | 'Processing_Speed'
  | 'Auditory Processing';

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
