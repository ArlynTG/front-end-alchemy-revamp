
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from '@/hooks/use-toast';

// Define the document upload types
export type DocumentUploadStatus = 'uploading' | 'success' | 'error';
export type DocumentUploadType = 'document' | 'report_card' | 'assessment' | 'other';

// Define the document upload interface
export interface DocumentUpload {
  id: string;
  name: string;
  file: File;
  type: DocumentUploadType;
  status: DocumentUploadStatus;
  progress: number;
  error?: string;
}

export function useDocumentUpload() {
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);

  const uploadFile = useCallback((file: File, type: DocumentUploadType) => {
    const id = uuidv4();
    
    // Create a new upload
    const newUpload: DocumentUpload = {
      id,
      name: file.name,
      file,
      type,
      status: 'uploading',
      progress: 0,
    };
    
    setUploads(prev => [...prev, newUpload]);
    
    // Simulate file upload progress
    const interval = setInterval(() => {
      setUploads(currentUploads => {
        const uploadIndex = currentUploads.findIndex(u => u.id === id);
        
        if (uploadIndex === -1) {
          clearInterval(interval);
          return currentUploads;
        }
        
        const upload = currentUploads[uploadIndex];
        
        if (upload.status !== 'uploading' || upload.progress >= 100) {
          clearInterval(interval);
          return currentUploads;
        }
        
        const newProgress = Math.min(upload.progress + 10, 100);
        const updatedUpload = { ...upload, progress: newProgress };
        
        // If reached 100%, mark as success after a short delay
        if (newProgress === 100) {
          setTimeout(() => {
            setUploads(latestUploads => {
              const finalIndex = latestUploads.findIndex(u => u.id === id);
              if (finalIndex === -1) return latestUploads;
              
              const updatedUploads = [...latestUploads];
              updatedUploads[finalIndex] = { ...updatedUploads[finalIndex], status: 'success' };
              return updatedUploads;
            });
          }, 500);
        }
        
        const updatedUploads = [...currentUploads];
        updatedUploads[uploadIndex] = updatedUpload;
        return updatedUploads;
      });
    }, 300);
    
    return id;
  }, []);
  
  const removeUpload = useCallback((id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  }, []);
  
  return {
    uploads,
    uploadFile,
    removeUpload
  };
}
