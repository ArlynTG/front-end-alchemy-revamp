
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, X, FileCheck, Upload } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';

interface FileUploadAreaProps {
  studentId: string;
  onUploadSuccess: () => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ studentId, onUploadSuccess }) => {
  const [uploadingFiles, setUploadingFiles] = useState<{ name: string; progress: number; complete: boolean }[]>([]);
  
  const { uploadDocument, isUploading } = useDocumentUpload({
    bucketName: 'documents',
    onSuccess: () => {
      // Notify parent about successful upload after showing completion animation
      setTimeout(() => {
        onUploadSuccess();
      }, 2000);
    },
    onError: (error) => {
      console.error('Upload error in component:', error);
    }
  });

  // Check if file is valid (type and size)
  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

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
        description: "File size must be less than 5MB.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Add file to uploading files list
      setUploadingFiles(prev => [...prev, { name: file.name, progress: 0, complete: false }]);
      
      // Upload file using the hook
      await uploadDocument(file);
      
      // Mark file as complete
      setUploadingFiles(prev => 
        prev.map(f => 
          f.name === file.name ? { ...f, progress: 100, complete: true } : f
        )
      );
      
      // Clear completed file after showing success
      setTimeout(() => {
        setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
      }, 2000);
      
    } catch (error) {
      // Remove failed file from list
      setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
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
    multiple: true 
  });

  const removeFile = (fileName: string) => {
    setUploadingFiles(prev => prev.filter(f => f.name !== fileName));
  };

  return (
    <div className="space-y-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
          ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}`}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-2">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="text-gray-600">
            Click to upload or drag files here
          </p>
          <p className="text-xs text-gray-500">
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max: 5MB)
          </p>
        </div>
      </div>

      {uploadingFiles.length > 0 && (
        <div className="space-y-3 mt-4">
          <h3 className="text-sm font-medium">Uploading Documents</h3>
          {uploadingFiles.map((file, index) => (
            <div key={`${file.name}-${index}`} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="flex items-center space-x-3 flex-1">
                <div className="flex-shrink-0">
                  {file.complete ? (
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <FileCheck className="h-5 w-5 text-green-500" />
                    </div>
                  ) : (
                    <File className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                  <div className="w-full mt-1">
                    <Progress value={file.progress} className="h-1.5" />
                  </div>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(file.name);
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
