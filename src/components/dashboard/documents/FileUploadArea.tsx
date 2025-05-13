import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, X, FileCheck, Upload, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import { DocumentUpload } from '@/components/onboarding/types';

interface FileUploadAreaProps {
  studentId: string;
  onUploadSuccess: () => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ studentId, onUploadSuccess }) => {
  const [uploadingFiles, setUploadingFiles] = useState<DocumentUpload[]>([]);
  
  const { uploadDocument, isUploading } = useDocumentUpload({
    bucketName: 'documents',
    onSuccess: () => {
      // Notify parent about successful upload after showing completion animation
      setTimeout(() => {
        onUploadSuccess();
      }, 1000);
    },
    onError: (error) => {
      console.error('Upload error in component:', error);
    }
  });

  // Check if file is valid (type and size)
  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, DOC, DOCX, JPG or PNG files only.",
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "File size must be less than 10MB.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Add file to uploading files list with initial progress
      const newUpload: DocumentUpload = {
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        type: 'other', // Default type
        size: file.size,
        progress: 0,
        status: 'uploading',
      };
      
      setUploadingFiles(prev => [...prev, newUpload]);
      
      // Create progress simulation
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 15) + 5;
        if (progress > 90) {
          clearInterval(progressInterval);
          progress = 90; // Cap at 90% until actual completion
        }
        
        setUploadingFiles(prev => 
          prev.map(f => 
            f.id === newUpload.id ? { ...f, progress } : f
          )
        );
      }, 300);
      
      // Upload file using the hook, passing the studentId as the UUID for the path
      await uploadDocument(file, studentId);
      
      // Clear progress interval and mark as complete
      clearInterval(progressInterval);
      
      // Mark file as complete with 100% progress
      setUploadingFiles(prev => 
        prev.map(f => 
          f.id === newUpload.id ? { ...f, progress: 100, status: 'complete' } : f
        )
      );
      
      // Clear completed file after showing success
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(f => f.id !== newUpload.id));
      }, 2000);
      
    } catch (error) {
      // Update file status to show error
      setUploadingFiles(prev => 
        prev.map(f => 
          f.id === newUpload.id 
            ? { ...f, error: error instanceof Error ? error.message : 'Upload failed', progress: 0, status: 'error' } 
            : f
        )
      );
      
      // Remove failed file after showing error
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(f => f.id !== newUpload.id));
      }, 3000);
      
      console.error('Error uploading file:', error);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      if (validateFile(file)) {
        await handleFileUpload(file);
      }
    }
  }, [studentId]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    multiple: true,
    disabled: isUploading
  });

  const removeFile = (fileId: string) => {
    setUploadingFiles(prev => prev.filter(f => f.id !== fileId));
  };

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
          ${isUploading ? 'opacity-80 cursor-not-allowed' : ''}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-gray-600">
            {isDragActive 
              ? "Drop files here..." 
              : isUploading 
                ? "Uploading..." 
                : "Click to upload or drag files here"}
          </p>
          <p className="text-xs text-gray-500">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max: 10MB)
          </p>
        </div>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="space-y-3 mt-4">
          <h3 className="text-sm font-medium">Uploading Documents</h3>
          {uploadingFiles.map((file, index) => (
            <div key={`${file.id}-${index}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-shrink-0">
                  {file.status === 'complete' ? (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-green-500" />
                    </div>
                  ) : file.status === 'error' ? (
                    <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                      <AlertCircle className="h-5 w-5 text-red-500" />
                    </div>
                  ) : (
                    <File className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <div className="w-full mt-1">
                    {file.status === 'error' ? (
                      <p className="text-xs text-red-500">{file.error}</p>
                    ) : (
                      <Progress value={file.progress} className="h-1.5" />
                    )}
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file.id as string);
                }}
                className="ml-2 flex-shrink-0 p-1 hover:bg-gray-200 rounded-full"
              >
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
