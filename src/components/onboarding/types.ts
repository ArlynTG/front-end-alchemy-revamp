
export type OnboardingStep = "profile" | "learning-differences" | "payment" | "document-upload" | "complete";

export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  childName: string;
  childAge: number;
  schoolName: string;
  schoolGrade: string;
  learningDifferences: LearningDifference[];
}

export type LearningDifference = {
  id: string;
  name: string;
  description: string;
  selected: boolean;
};

export interface DocumentUpload {
  id: string;
  name: string;
  type: string;
  size: number;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
  error?: string;
  url?: string;
}
