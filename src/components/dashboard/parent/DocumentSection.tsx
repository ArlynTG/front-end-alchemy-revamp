
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import DocumentUploadForm from '@/components/onboarding/DocumentUploadForm';

interface DocumentSectionProps {
  studentId: string;
  itemVariants: any;
}

const DocumentSection: React.FC<DocumentSectionProps> = ({ studentId, itemVariants }) => {
  // Simple handler to show success message when document upload is complete
  const handleComplete = () => {
    console.log("Document upload complete");
  };
  
  // Placeholder function for back button - does nothing in this context
  const handleBack = () => {
    // No-op in this context
  };
  
  return (
    <motion.div variants={itemVariants} className="mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Educational Documents</CardTitle>
          <CardDescription>
            Upload student documents for assessment and personalized learning goals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DocumentUploadForm 
            studentId={studentId}
            onComplete={handleComplete}
            onBack={handleBack}
          />
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default DocumentSection;
