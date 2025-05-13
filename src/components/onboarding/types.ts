export type OnboardingStep =
  | "profile"
  | "learning-differences"
  | "payment"
  | "document-upload"
  | "complete";

export type LearningDifference =
  | "Dyslexia"
  | "ADHD"
  | "Dyscalculia"
  | "Auditory Processing"
  | "Executive_Functioning"
  | "Self_Advocacy"
  | "Processing_Speed";

export const ALL_LEARNING_DIFFERENCES: LearningDifference[] = [
  "Dyslexia",
  "ADHD",
  "Dyscalculia",
  "Auditory Processing",
  "Executive_Functioning",
  "Self_Advocacy",
  "Processing_Speed",
];

export interface OnboardingFormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  studentName: string;
  studentAge: string;
  learningDifferences: LearningDifference[];
  paymentId: string;
}

export type DocumentUploadType = 'schoolReport' | 'assessmentReport' | 'other';

export type DocumentUploadStatus = 'uploading' | 'complete' | 'error';

export interface DocumentUpload {
  id: string;
  name: string;
  type: DocumentUploadType;
  size: number;
  progress: number;
  status: DocumentUploadStatus;
  url?: string;
  error?: string;
}
