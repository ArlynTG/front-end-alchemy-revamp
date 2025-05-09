
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X, AlertTriangle, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface FileRecord {
  id: string;
  file_name: string;
  file_type: string | null;
  file_url: string | null;
  doc_type: string | null;
  uploaded_at: string | null;
}

interface UploadFilesProps {
  studentId: string;
}

const UploadFiles: React.FC<UploadFilesProps> = ({ studentId }) => {
  const [files, setFiles] = useState<FileRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
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

  // Handle drag events
  const handleDragEnter = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  // Handle file drop
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileUpload(files);
    }
  };

  // Handle file upload via input
  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files);
    }
  };

  // Upload files to Supabase
  const handleFileUpload = async (files: FileList) => {
    if (!studentId) {
      toast({
        title: "Upload failed",
        description: "Student ID is required for upload",
        variant: "destructive"
      });
      return;
    }

    setUploading(true);
    
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileExtension = file.name.split('.').pop() || '';
      const filePath = `${studentId}/${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExtension}`;
      
      try {
        // Step 1: Upload file to Storage (this part is working)
        const { data: storageData, error: storageError } = await supabase
          .storage
          .from('documents')
          .upload(filePath, file);

        if (storageError) {
          throw storageError;
        }

        console.log("File uploaded successfully to Storage:", storageData);

        // Step 2: Get the public URL
        const { data: publicUrlData } = await supabase
          .storage
          .from('documents')
          .getPublicUrl(filePath);

        const fileUrl = publicUrlData.publicUrl;
        console.log("File public URL:", fileUrl);

        // Step 3: Create a record in uploads table (this part is missing)
        const { data: uploadRecord, error: uploadError } = await supabase
          .from('uploads')
          .insert({
            uuid: studentId,
            file_name: file.name,
            file_type: fileExtension.toLowerCase(),
            file_url: fileUrl,
            file_size: file.size,
            doc_type: 'assessment', // Or determine dynamically
            uploaded_by: 'parent',
            processed: false  // Important for trigger!
          })
          .select();

        if (uploadError) {
          console.error("Error inserting file record:", uploadError);
          toast({
            title: "Upload record failed",
            description: uploadError.message,
            variant: "destructive"
          });
        } else {
          console.log("Record created in uploads table:", uploadRecord);
          toast({
            title: "Upload successful",
            description: `${file.name} has been uploaded and recorded.`,
            variant: "default"
          });
          
          // Refresh the file list
          fetchFiles();
        }
      } catch (err) {
        console.error("Exception during upload:", err);
        toast({
          title: "Upload failed",
          description: err instanceof Error ? err.message : "An unknown error occurred",
          variant: "destructive"
        });
      }
    }
    
    setUploading(false);
  };

  // Format the date for display
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Unknown date';
    
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  // Get file icon based on file type
  const getFileIcon = (fileType: string | null) => {
    if (!fileType) return <FileText className="h-5 w-5" />;
    
    if (fileType.includes('pdf')) {
      return <FileText className="h-5 w-5" />;
    }
    
    if (fileType.includes('image')) {
      return <FileText className="h-5 w-5" />;
    }
    
    return <FileText className="h-5 w-5" />;
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
      <h2 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
        <FileText className="mr-2 h-5 w-5" /> Academic Records
      </h2>
      
      {/* Drag & Drop Upload Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-4 mb-6 text-center transition-colors 
          ${isDragging ? 'border-primary bg-primary/10' : 'border-gray-300 hover:border-primary/50'}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center py-4">
          <Upload className={`h-10 w-10 mb-2 ${isDragging ? 'text-primary' : 'text-gray-400'}`} />
          <p className="mb-1 font-medium">Drag and drop files here</p>
          <p className="text-sm text-gray-500 mb-4">or click to browse</p>
          
          <input
            type="file"
            id="fileInput"
            className="hidden"
            multiple
            onChange={handleFileInputChange}
          />
          
          <Button
            onClick={() => document.getElementById('fileInput')?.click()}
            disabled={uploading}
            variant="outline"
          >
            {uploading ? 'Uploading...' : 'Select Files'}
          </Button>
        </div>
      </div>
      
      {/* File List */}
      {isLoading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
          <p>No academic records found for this student</p>
          <p className="text-sm">Upload new documents using the area above</p>
        </div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-2"
        >
          {files.map((file) => (
            <motion.div
              key={file.id}
              variants={itemVariants}
              className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-md shadow-sm">
                  {getFileIcon(file.file_type)}
                </div>
                <div>
                  <p className="font-medium truncate max-w-[200px] md:max-w-[300px]">
                    {file.file_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {formatDate(file.uploaded_at)}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="ghost"
                className="ml-2"
                onClick={() => {
                  if (file.file_url) {
                    window.open(file.file_url, '_blank');
                  } else {
                    toast({
                      title: "File unavailable",
                      description: "The file URL is not available.",
                      variant: "destructive"
                    });
                  }
                }}
              >
                View
              </Button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default UploadFiles;
