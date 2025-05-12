
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Upload } from 'lucide-react';
import FileUploadArea from './FileUploadArea';
import DocumentList from './DocumentList';

interface DocumentUploaderProps {
  studentId: string;
}

const DocumentUploader: React.FC<DocumentUploaderProps> = ({ studentId }) => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleUploadSuccess = () => {
    // Trigger a refresh of the document list
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Upload className="h-5 w-5 mr-2 text-blue-500" />
          Educational Documents
        </CardTitle>
        <CardDescription>
          Upload student documents for assessment and personalized learning goals
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <FileUploadArea studentId={studentId} onUploadSuccess={handleUploadSuccess} />
        <DocumentList studentId={studentId} refreshTrigger={refreshTrigger} />
      </CardContent>
    </Card>
  );
};

export default DocumentUploader;
