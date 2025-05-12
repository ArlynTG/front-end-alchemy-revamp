
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

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
    try {
      setUploadState({
        progress: 0,
        uploading: true,
        error: null,
      });

      // Get user session for authentication
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Authentication required');
      }

      const userId = session.user.id;
      
      // Create file path with user ID, timestamp and original filename
      const timestamp = new Date().getTime();
      const filePath = `${folderPath || userId}/${timestamp}_${file.name}`;

      // Start progress animation - set to 10% to indicate process has started
      setUploadState(prev => ({
        ...prev,
        progress: 10,
      }));

      // Upload file to Supabase Storage
      const { error, data } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // Upload complete - set progress to 100%
      setUploadState({
        progress: 100,
        uploading: false,
        error: null,
      });

      // Call success callback if provided
      if (onSuccess) {
        onSuccess(filePath);
      }

      return { filePath, data };
    } catch (error) {
      console.error('Error uploading document:', error);
      
      const uploadError = error instanceof Error ? error : new Error('Unknown error occurred');

      setUploadState({
        progress: 0,
        uploading: false,
        error: uploadError,
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
