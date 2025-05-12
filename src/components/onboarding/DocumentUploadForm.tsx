
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { File, UploadCloud, X, CheckCircle, AlertCircle } from "lucide-react";
import { DocumentUpload } from "./types";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";

interface DocumentUploadFormProps {
  studentId: string;
  onComplete: () => void;
  onBack: () => void;
}

const DocumentUploadForm = ({ studentId, onComplete, onBack }: DocumentUploadFormProps) => {
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);
  
  const { uploadDocument, isUploading } = useDocumentUpload({
    bucketName: 'documents',
    onSuccess: (filePath) => {
      // Update the completed upload
      setUploads(prev => 
        prev.map(upload => 
          upload.status === 'uploading' 
            ? { ...upload, status: 'complete', url: filePath } 
            : upload
        )
      );
      
      toast({
        title: "Document uploaded successfully",
        description: "Your document has been uploaded and will be reviewed.",
      });
    },
    onError: (error) => {
      // Mark the upload as failed
      setUploads(prev => 
        prev.map(upload => 
          upload.status === 'uploading' 
            ? { ...upload, status: 'error', error: error.message } 
            : upload
        )
      );
      
      toast({
        title: "Upload failed",
        description: error.message,
        variant: "destructive"
      });
    }
  });
  
  // File validation function
  const validateFile = (file: File) => {
    const validTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload PDF, DOC, DOCX, JPG or PNG files only.",
        variant: "destructive"
      });
      return false;
    }

    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "File size must be less than 10MB.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };
  
  const handleUpload = useCallback(async (files: File[]) => {
    const validFiles = files.filter(validateFile);
    
    if (validFiles.length === 0) return;
    
    for (const file of validFiles) {
      // Add file to uploads with uploading status
      const newUpload: DocumentUpload = {
        id: `${Date.now()}-${file.name}`,
        name: file.name,
        type: file.type.includes('pdf') ? 'PDF' : 
              file.type.includes('word') ? 'DOC' : 
              file.type.includes('image') ? 'Image' : 'Other',
        size: file.size,
        progress: 0,
        status: 'uploading',
      };
      
      setUploads(prev => [...prev, newUpload]);
      
      try {
        await uploadDocument(file, studentId);
        
        // Note: Success handling is done in the onSuccess callback
      } catch (err) {
        console.error("Error during upload:", err);
        // Error handling is done in onError callback
      }
    }
  }, [uploadDocument, studentId]);
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleUpload,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    disabled: isUploading,
    maxSize: 10 * 1024 * 1024 // 10MB
  });
  
  const removeUpload = (id: string) => {
    setUploads(prev => prev.filter(upload => upload.id !== id));
  };
  
  const hasUploads = uploads.some(upload => upload.status === 'complete');

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Upload Educational Documents</h2>
        <p className="mt-1 text-sm text-gray-500">
          Upload any educational documents like report cards, IEPs, or assessments that will help us understand your child's learning needs better.
        </p>
      </div>
      
      {/* Main drag & drop area */}
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer
          ${isDragActive ? "border-tobey-orange bg-orange-50" : "border-gray-300 hover:border-gray-400"}
          ${isUploading ? "opacity-75 cursor-not-allowed" : ""}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center space-y-3">
          <UploadCloud className="h-12 w-12 text-gray-400" />
          <div>
            <p className="text-base font-medium text-gray-700">
              {isDragActive ? "Drop your files here" : "Drag and drop files here"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              or <span className="text-blue-500 underline">browse files</span> from your device
            </p>
          </div>
          <div className="text-xs text-gray-500 mt-4 max-w-md mx-auto">
            <p>We accept PDF, DOC, DOCX, JPG, and PNG files (max 10MB per file)</p>
            <p className="mt-1">Upload educational documents like report cards, IEPs, assessment results, or any other relevant documents</p>
          </div>
        </div>
      </div>
      
      {/* Upload list */}
      {uploads.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">Uploaded Documents</h3>
          <div className="space-y-3">
            {uploads.map((upload) => (
              <div 
                key={upload.id} 
                className={`flex items-center justify-between p-3 rounded-md
                  ${upload.status === 'complete' ? 'bg-green-50 border border-green-100' : 
                    upload.status === 'error' ? 'bg-red-50 border border-red-100' : 
                    'bg-gray-50 border border-gray-200'}
                `}
              >
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-shrink-0">
                    {upload.status === 'complete' ? (
                      <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                      </div>
                    ) : upload.status === 'error' ? (
                      <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                    ) : (
                      <File className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{upload.name}</p>
                      <p className="text-xs text-gray-500">{upload.type}</p>
                    </div>
                    {upload.status === 'uploading' && (
                      <Progress value={upload.progress} className="h-1.5 mt-2" />
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {upload.status === 'complete' 
                        ? 'Upload complete' 
                        : upload.status === 'error' 
                          ? upload.error || 'Upload failed' 
                          : 'Uploading...'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeUpload(upload.id);
                  }}
                  className="ml-2 flex-shrink-0 p-1 hover:bg-gray-200 rounded-full"
                  disabled={upload.status === 'uploading'}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex justify-between pt-6 border-t border-gray-200 mt-6">
        <Button 
          type="button" 
          variant="outline" 
          onClick={onBack}
        >
          Back
        </Button>
        <Button 
          type="button"
          onClick={onComplete}
          disabled={isUploading}
        >
          {hasUploads ? "Complete Signup" : "Skip for now"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
