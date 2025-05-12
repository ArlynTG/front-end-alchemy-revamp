
import { Database } from "@/integrations/supabase/types";

// Extended learning difference type that includes our new values
export type LearningDifference = 
  | Database["public"]["Enums"]["learning_difference"]
  | "Dyscalculia"
  | "Self Advocacy"
  | "Processing Speed";

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
