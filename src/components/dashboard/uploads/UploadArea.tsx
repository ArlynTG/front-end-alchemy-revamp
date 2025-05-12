
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadAreaProps {
  onFileUpload: (files: FileList) => void;
  uploading: boolean;
}

const UploadArea: React.FC<UploadAreaProps> = ({ 
  onFileUpload, 
  uploading
}) => {
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onFileUpload(files);
    }
  };

  // Handle file upload via input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileUpload(e.target.files);
    }
  };

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-4 mb-6 text-center transition-colors 
        ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50'}`}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <div className="flex flex-col items-center justify-center py-4">
        <Upload className={`h-10 w-10 mb-2 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
        <p className="mb-1 font-medium">Drag and drop files here</p>
        <p className="text-sm text-gray-500 mb-4">or click to browse</p>
        
        <input
          type="file"
          id="fileInput"
          className="hidden"
          onChange={handleFileInputChange}
          disabled={uploading}
        />
        
        <Button
          onClick={() => document.getElementById('fileInput')?.click()}
          disabled={uploading}
          variant="outline"
        >
          {uploading ? 'Uploading...' : 'Select Files'}
        </Button>
      </div>
    </div>
  );
};

export default UploadArea;
