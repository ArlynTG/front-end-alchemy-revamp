
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { File, X, FileCheck } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FileUploadAreaProps {
  studentId: string;
  onUploadSuccess: () => void;
}

const FileUploadArea: React.FC<FileUploadAreaProps> = ({ studentId, onUploadSuccess }) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState<{ name: string; progress: number; complete: boolean }[]>([]);

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

  const uploadFile = async (file: File) => {
    try {
      // Get authenticated user's ID
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Authentication required",
          description: "Please log in to upload files.",
          variant: "destructive"
        });
        return;
      }

      const userId = session.user.id;
      const timestamp = new Date().getTime();
      const filePath = `${userId}/${timestamp}_${file.name}`;

      // Update file progress state
      setUploadingFiles(prev => [...prev, { name: file.name, progress: 0, complete: false }]);

      // Upload file with progress tracking
      const { error, data } = await supabase.storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
          onUploadProgress: (progress) => {
            const percent = Math.round((progress.loaded / progress.total) * 100);
            setUploadProgress(percent);
            
            // Update specific file progress
            setUploadingFiles(prev => 
              prev.map(f => 
                f.name === file.name ? { ...f, progress: percent } : f
              )
            );
          }
        });

      if (error) {
        throw error;
      }

      // Mark file as complete
      setUploadingFiles(prev => 
        prev.map(f => 
          f.name === file.name ? { ...f, progress: 100, complete: true } : f
        )
      );

      // Show success toast after small delay to show completion animation
      setTimeout(() => {
        toast({
          title: "Upload successful",
          description: "Your document has been uploaded and is being processed",
          variant: "default"
        });
      }, 500);

      // Notify parent about successful upload
      setTimeout(() => {
        onUploadSuccess();
        
        // Clear completed file after showing success
        setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
      }, 2000);

    } catch (error) {
      console.error('Error uploading file:', error);
      toast({
        title: "Upload failed",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive"
      });

      // Remove failed file from list
      setUploadingFiles(prev => prev.filter(f => f.name !== file.name));
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setIsUploading(true);

    for (const file of acceptedFiles) {
      if (validateFile(file)) {
        await uploadFile(file);
      }
    }

    setIsUploading(false);
    setUploadProgress(0);
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
            Supported formats: PDF, DOC, DOCX, JPG, PNG (Max: 10MB)
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
