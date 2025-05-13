
export type OnboardingStep = 'profile' | 'learning-differences' | 'payment' | 'document-upload' | 'complete';

export type LearningDifference = 
  | "Dyslexia"
  | "ADHD"
  | "Dyscalculia" 
  | "Auditory Processing"
  | "Executive_Functioning"
  | "Self_Advocacy"
  | "Processing_Speed";

// Export this array for validation and UI purposes
export const ALL_LEARNING_DIFFERENCES: LearningDifference[] = [
  "Dyslexia",
  "ADHD",
  "Dyscalculia",
  "Auditory Processing",
  "Executive_Functioning",
  "Self_Advocacy",
  "Processing_Speed"
];

export type DocumentUploadType = 'schoolReport' | 'assessmentReport' | 'iepDocument' | 'other';

// Extended DocumentUpload type with all required properties
export interface DocumentUpload {
  id?: string;
  type: DocumentUploadType;
  file?: File;
  name?: string;
  size?: number;
  progress?: number;
  status?: 'uploading' | 'complete' | 'error';
  url?: string;
  error?: string;
  description?: string;
}

export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  studentName: string;
  studentAge: string;
  phone: string;
  learningDifferences?: LearningDifference[];
  goals?: string[];
  uploads?: DocumentUpload[];
}
