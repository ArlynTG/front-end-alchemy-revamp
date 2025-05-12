
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

  const uploadDocument = async (file: File, folderPath?: string) => {
    // Validate file size
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      const sizeError = new Error('File size must be less than 5MB');
      setUploadState({
        progress: 0,
        uploading: false,
        error: sizeError,
      });
      
      if (onError) {
        onError(sizeError);
      }
      
      throw sizeError;
    }
    
    try {
      setUploadState({
        progress: 0,
        uploading: true,
        error: null,
      });

      // Get user session
      const { data: { session } } = await supabase.auth.getSession();
      
      // Create a temporary ID if no user is found
      const tempId = `temp-${Date.now()}`;
      const userId = session?.user?.id || tempId;
      
      // Create file path with ID and original filename
      const timestamp = new Date().getTime();
      const safeFolderPath = folderPath || userId;
      const filePath = `${safeFolderPath}/${timestamp}_${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

      console.log('Uploading to bucket:', bucketName);
      console.log('File path:', filePath);

      // Set progress animation to indicate process has started
      setUploadState(prev => ({
        ...prev,
        progress: 10,
      }));

      // Check if bucket exists before upload
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket(bucketName);

      if (bucketError) {
        console.error('Bucket error:', bucketError);
        throw new Error(`Bucket ${bucketName} does not exist or is not accessible`);
      }

      // Upload file to Supabase Storage
      const { error, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error('Upload error:', error);
        throw error;
      }

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
