
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";
import { DocumentUpload, DocumentUploadType } from "@/components/onboarding/types";

interface UseDocumentUploadOptions {
  bucketName: string;
  onSuccess?: (filePath: string) => void;
  onError?: (error: Error) => void;
}

export const useDocumentUpload = ({
  bucketName,
  onSuccess,
  onError,
}: UseDocumentUploadOptions) => {
  const [isUploading, setIsUploading] = useState(false);

  const getDocumentTypeFromMimeType = (mimeType: string): DocumentUploadType => {
    if (mimeType.includes('pdf')) return 'schoolReport';
    if (mimeType.includes('word') || mimeType.includes('doc')) return 'assessmentReport';
    return 'other';
  };

  const uploadDocument = async (file: File, studentId: string) => {
    setIsUploading(true);
    
    try {
      // Create a unique file path using the student ID and original filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${studentId}/${fileName}`;
      
      // Upload file to Supabase Storage
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
      
      if (error) {
        console.error('Error uploading file:', error);
        throw new Error(`Upload failed: ${error.message}`);
      }
      
      // Get the public URL for the file
      const { data: { publicUrl } } = supabase.storage
        .from(bucketName)
        .getPublicUrl(filePath);
      
      console.log('File uploaded successfully:', publicUrl);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(publicUrl);
      }
      
      return publicUrl;
    } catch (error) {
      console.error('Upload error:', error);
      
      // Call error callback if provided
      if (onError && error instanceof Error) {
        onError(error);
      }
      
      throw error;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    uploadDocument,
    isUploading
  };
};
