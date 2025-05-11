
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface FileRecord {
  id: string;
  file_name: string;
  file_type: string | null;
  file_url: string | null;
  doc_type: string | null;
  uploaded_at: string | null;
}

export const useFileUpload = (studentId: string) => {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch existing files from Supabase
  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('uploads')
        .select('*')
        .eq('uuid', studentId)
        .order('uploaded_at', { ascending: false });

      if (error) {
        console.error("Error fetching files:", error);
        toast({
          title: "Error loading files",
          description: error.message,
          variant: "destructive"
        });
      } else if (data) {
        console.log("Retrieved files:", data);
        setFiles(data);
      }
    } catch (err) {
      console.error("Exception during fetch:", err);
      toast({
        title: "Error loading files",
        description: err instanceof Error ? err.message : "Unknown error occurred",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) {
      fetchFiles();
    }
  }, [studentId]);

  // Notify webhook about new document upload
  const notifyWebhook = async (uploadId: string, fileName: string) => {
    try {
      console.log("Notifying webhook about new upload:", { studentId, uploadId, fileName });
      const response = await fetch('https://tobiasedtech.app.n8n.cloud/webhook/process-document', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: studentId,
          upload_id: uploadId,
          file_name: fileName
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Webhook notification failed: ${response.status} - ${errorText}`);
      }

      console.log("Webhook notification successful");
      toast({
        title: "Document processing started",
        description: "Your document is being processed for personalized goals.",
      });
    } catch (err) {
      console.error("Error notifying webhook:", err);
      toast({
        title: "Document processing notification failed",
        description: "We'll still try to process your document.",
        variant: "destructive"
      });
    }
  };

  // Handle file upload
  const handleFileUpload = async (files: FileList) => {
    if (!studentId || !files.length) return;
    
    setUploading(true);
    const file = files[0]; // Just handle one file for testing
    
    try {
      // Step 1: Just log the attempt
      console.log("Starting upload for file:", file.name);
      
      // Step 2: Upload to Storage only
      const filePath = `${studentId}/${Date.now()}.${file.name.split('.').pop()}`;
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('documents')
        .upload(filePath, file);
        
      if (storageError) throw storageError;
      console.log("File uploaded to Storage successfully");
      
      // Step 3: Create a public URL for the file
      const { data: publicUrlData } = await supabase
        .storage
        .from('documents')
        .createSignedUrl(filePath, 60 * 60 * 24 * 365); // 1 year expiration
      
      const fileUrl = publicUrlData?.signedUrl || null;
      
      // Step 4: Insert record to uploads table
      console.log("Attempting to insert record to uploads table");
      const { data: uploadData, error: uploadError } = await supabase
        .from('uploads')
        .insert({
          uuid: studentId,
          file_name: file.name,
          file_type: file.type,
          file_url: fileUrl
        })
        .select('*')
        .single();
        
      if (uploadError) throw uploadError;
      console.log("Record inserted successfully:", uploadData);
      
      // Step 5: Notify webhook about the new document upload
      if (uploadData) {
        await notifyWebhook(uploadData.id, file.name);
      }
      
      // Success!
      toast({
        title: "Success",
        description: "File uploaded and record created",
        variant: "default"
      });
      
      // Refresh the file list
      fetchFiles();
      
    } catch (err) {
      console.error("Error details:", err);
      toast({
        title: "Error",
        description: err instanceof Error ? err.message : "Unknown error",
        variant: "destructive"
      });
    } finally {
      setUploading(false);
    }
  };

  return {
    files,
    isLoading,
    uploading,
    handleFileUpload
  };
};
