
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface UseDocumentUploadOptions {
  bucketName: string;
  onSuccess?: (filePath: string) => void;
  onError?: (error: Error) => void;
}

interface UploadProgressState {
  progress: number;
  uploading: boolean;
  error: Error | null;
}

export const useDocumentUpload = ({ bucketName, onSuccess, onError }: UseDocumentUploadOptions) => {
  const [uploadState, setUploadState] = useState<UploadProgressState>({
    progress: 0,
    uploading: false,
    error: null,
  });

  const uploadDocument = async (file: File, userUuid?: string) => {
    // Validate file size - 10MB limit
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      const sizeError = new Error('File size must be less than 10MB');
      setUploadState({
        progress: 0,
        uploading: false,
        error: sizeError,
      });
      
      if (onError) {
        onError(sizeError);
      }
      
      toast({
        title: "File too large",
        description: "File size must be less than 10MB",
        variant: "destructive"
      });
      
      throw sizeError;
    }
    
    try {
      setUploadState({
        progress: 0,
        uploading: true,
        error: null,
      });
      
      // Check authentication explicitly
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required - please log in');
      }
      
      // Use a more reliable UUID source
      const uuid = userUuid || session?.user?.id;
      if (!uuid) {
        throw new Error('Missing user ID for upload path');
      }
      
      // Simplify file path
      const filePath = `${uuid}/${file.name}`;
      console.log(`Starting upload to ${bucketName}/${filePath}`);

      // Set initial progress
      setUploadState(prev => ({
        ...prev,
        progress: 10,
      }));

      // Upload file to Supabase Storage using the specified bucket and path format
      const { error, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true // Replace existing files with the same name
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

      console.log('Upload successful:', data);

      // Upload complete - set progress to 100%
      setUploadState({
        progress: 100,
        uploading: false,
        error: null,
      });

      // Show success message
      toast({
        title: "Upload successful",
        description: "Your document has been uploaded successfully",
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(filePath);
      }

      return { filePath, data };
    } catch (error) {
      console.error('Error uploading document:', error);
      
      const uploadError = error instanceof Error ? error : new Error('Unknown error occurred during upload');

      setUploadState({
        progress: 0,
        uploading: false,
        error: uploadError,
      });

      // Show error message
      toast({
        title: "Upload failed",
        description: uploadError.message || "Failed to upload document",
        variant: "destructive"
      });

      // Call error callback if provided
      if (onError) {
        onError(uploadError);
      }

      throw uploadError;
    }
  };

  return {
    uploadDocument,
    uploadProgress: uploadState.progress,
    isUploading: uploadState.uploading,
    uploadError: uploadState.error,
    resetUploadState: () => setUploadState({
      progress: 0,
      uploading: false,
      error: null,
    }),
  };
};
