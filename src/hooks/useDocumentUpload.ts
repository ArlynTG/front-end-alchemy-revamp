import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { DocumentUpload, DocumentUploadType } from '@/components/onboarding/types';

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
  
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);

  const addUpload = (file: File): DocumentUpload => {
    const newUpload: DocumentUpload = {
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      type: getDocumentUploadType(file.type),
      size: file.size,
      progress: 0,
      status: 'uploading',
    };
    
    setUploads(prev => [...prev, newUpload]);
    return newUpload;
  };

  const updateUploadProgress = (id: string, progress: number) => {
    setUploads(prev => 
      prev.map(upload => 
        upload.id === id ? { ...upload, progress } : upload
      )
    );
  };

  const updateUploadStatus = (
    id: string, 
    status: 'uploading' | 'complete' | 'error',
    url?: string,
    error?: string
  ) => {
    setUploads(prev => 
      prev.map(upload => 
        upload.id === id ? { ...upload, status, url, error } : upload
      )
    );
  };

  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };

  // Helper function to map MIME types to DocumentUploadType
  const getDocumentUploadType = (mimeType: string): DocumentUploadType => {
    if (mimeType.includes('pdf')) return 'schoolReport';
    if (mimeType.includes('word')) return 'assessmentReport';
    if (mimeType.includes('image')) return 'other';
    return 'other';
  };

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
      if (!session && !userUuid) {
        throw new Error('Authentication required - please log in');
      }
      
      // Use a more reliable UUID source
      const uuid = userUuid || session?.user?.id;
      if (!uuid) {
        throw new Error('Missing user ID for upload path');
      }
      
      // Create file path
      const filePath = `${uuid}/${file.name}`;
      console.log(`Starting upload to ${bucketName}/${filePath}`);

      // Set initial progress
      setUploadState(prev => ({
        ...prev,
        progress: 10,
      }));

      // Upload file to Supabase Storage
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

      return filePath;
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

  // Add function to fetch existing documents
  const fetchUserDocuments = async (userId: string) => {
    try {
      // Fetch documents from storage
      const { data: storageData, error: storageError } = await supabase.storage
        .from(bucketName)
        .list(userId, {
          sortBy: { column: 'created_at', order: 'desc' }
        });

      if (storageError) {
        console.error('Error fetching documents:', storageError);
        throw storageError;
      }

      if (!storageData || storageData.length === 0) {
        return [];
      }

      return storageData.map(file => ({
        id: file.id,
        name: file.name,
        size: file.metadata?.size || 0,
        created_at: file.created_at,
        type: file.metadata?.mimetype || getFileTypeFromName(file.name),
      }));
    } catch (error) {
      console.error('Error in fetchUserDocuments:', error);
      toast({
        title: "Failed to fetch documents",
        description: error instanceof Error ? error.message : "Unknown error occurred",
        variant: "destructive"
      });
      return [];
    }
  };

  // Add function to get document URL
  const getDocumentUrl = async (userId: string, fileName: string) => {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .createSignedUrl(`${userId}/${fileName}`, 3600); // 1 hour expiry

      if (error) throw error;
      
      return data.signedUrl;
    } catch (error) {
      console.error('Error getting document URL:', error);
      return null;
    }
  };

  // Add function to delete document
  const deleteDocument = async (userId: string, fileName: string) => {
    try {
      const { error } = await supabase.storage
        .from(bucketName)
        .remove([`${userId}/${fileName}`]);

      if (error) throw error;
      
      toast({
        title: "Document deleted",
        description: "The document was successfully deleted",
      });
      
      return true;
    } catch (error) {
      console.error('Error deleting document:', error);
      toast({
        title: "Delete failed",
        description: error instanceof Error ? error.message : "Failed to delete document",
        variant: "destructive"
      });
      return false;
    }
  };

  // Helper function to determine file type from name
  const getFileTypeFromName = (fileName: string): string => {
    const extension = fileName.split('.').pop()?.toLowerCase() || '';
    
    switch (extension) {
      case 'pdf':
        return 'application/pdf';
      case 'doc':
        return 'application/msword';
      case 'docx':
        return 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'png':
        return 'image/png';
      default:
        return 'application/octet-stream';
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
    // New methods
    uploads,
    addUpload,
    updateUploadProgress,
    updateUploadStatus,
    removeUpload,
    fetchUserDocuments: (userId: string) => console.log('Fetch user documents:', userId),
    getDocumentUrl: (userId: string, fileName: string) => `${bucketName}/${userId}/${fileName}`,
    deleteDocument: (userId: string, fileName: string) => console.log('Delete document:', userId, fileName)
  };
};
