
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
      console.log("Fetching files for student:", studentId);
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
  const handleFileUpload = async (fileList: FileList) => {
    if (!studentId || !fileList.length) {
      console.log("Missing studentId or files array is empty");
      return;
    }
    
    setUploading(true);
    const file = fileList[0]; // Handle one file at a time
    
    try {
      console.log("Starting upload process for file:", file.name);
      console.log("File details:", {
        name: file.name,
        type: file.type,
        size: `${(file.size / 1024).toFixed(2)} KB`
      });
      
      // Check if the bucket exists and is accessible
      const { data: bucketData, error: bucketError } = await supabase
        .storage
        .getBucket('documents');
        
      if (bucketError) {
        console.error("Storage bucket error:", bucketError);
        if (bucketError.message.includes("does not exist")) {
          console.error("The 'documents' bucket does not exist in Supabase storage");
          toast({
            title: "Storage Configuration Error",
            description: "The storage bucket for documents is not properly configured",
            variant: "destructive"
          });
          throw new Error("Storage bucket configuration error");
        }
      } else {
        console.log("Bucket exists:", bucketData);
      }
      
      // Generate a unique file path
      const filePath = `${studentId}/${Date.now()}_${file.name}`;
      console.log("Generated file path:", filePath);
      
      // Upload to Storage bucket
      console.log("Uploading to storage bucket...");
      const { data: storageData, error: storageError } = await supabase
        .storage
        .from('documents')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false
        });
        
      if (storageError) {
        console.error("Storage upload error:", storageError);
        throw storageError;
      }
      
      console.log("File uploaded to Storage successfully:", storageData);
      
      // Create a public URL for the file
      console.log("Creating signed URL for the file...");
      const { data: publicUrlData } = await supabase
        .storage
        .from('documents')
        .getPublicUrl(filePath);
      
      const fileUrl = publicUrlData?.publicUrl || null;
      console.log("File public URL generated:", fileUrl);
      
      // Insert record to uploads table
      console.log("Inserting record into uploads table...");
      const { data: uploadData, error: uploadError } = await supabase
        .from('uploads')
        .insert({
          uuid: studentId,
          file_name: file.name,
          file_type: file.type,
          file_url: fileUrl,
          file_size: file.size,
          uploaded_by: 'parent_dashboard'
        });
        
      if (uploadError) {
        console.error("Error inserting record:", uploadError);
        throw uploadError;
      }
      
      console.log("File record inserted successfully");
      
      // Refresh the file list
      await fetchFiles();
      
      // Success message
      toast({
        title: "Upload Successful",
        description: "File has been uploaded to academic records",
      });
      
    } catch (err) {
      console.error("Upload error:", err);
      toast({
        title: "Upload Failed",
        description: err instanceof Error ? err.message : "An unknown error occurred while uploading",
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
