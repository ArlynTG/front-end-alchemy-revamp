
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
      
      // Step 3: Just try to insert a minimal record
      console.log("Attempting to insert record to uploads table");
      const { data, error } = await supabase
        .from('uploads')
        .insert({
          uuid: studentId,
          file_name: file.name
        });
        
      if (error) throw error;
      console.log("Record inserted successfully");
      
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
