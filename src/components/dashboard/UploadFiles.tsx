
import React from 'react';
import { FileText } from 'lucide-react';
import FileList from './uploads/FileList';
import UploadArea from './uploads/UploadArea';
import { useFileUpload } from './uploads/useFileUpload';

interface UploadFilesProps {
  studentId: string;
}

const UploadFiles: React.FC<UploadFilesProps> = ({ studentId }) => {
  const { files, isLoading, uploading, handleFileUpload } = useFileUpload(studentId);

  console.log("UploadFiles component rendering with studentId:", studentId);
  console.log("Current files:", files);
  console.log("Upload state - isLoading:", isLoading, "uploading:", uploading);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5" /> Academic Records
      </h2>
      
      {/* Drag & Drop Upload Area */}
      <UploadArea 
        onFileUpload={handleFileUpload}
        uploading={uploading}
      />
      
      {/* File List */}
      <FileList 
        files={files} 
        isLoading={isLoading} 
      />
    </div>
  );
};

export default UploadFiles;
