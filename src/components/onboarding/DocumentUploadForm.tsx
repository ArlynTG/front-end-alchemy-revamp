
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/hooks/use-toast";
import { File, UploadCloud, X, CheckCircle } from "lucide-react";
import { DocumentUpload } from "./types";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";

interface DocumentUploadFormProps {
  studentId: string;
  onComplete: () => void;
  onBack: () => void;
}

// Document types with descriptions
const documentTypes = [
  {
    type: "Report Card",
    description: "Most recent school report cards",
    examples: "Quarter or semester report cards, progress reports"
  },
  {
    type: "IEP",
    description: "Individualized Education Program",
    examples: "Current IEP document, 504 plan"
  },
  {
    type: "Neuropsych",
    description: "Neuropsychological evaluation",
    examples: "Testing results, professional assessments"
  },
  {
    type: "Other",
    description: "Other relevant educational documents",
    examples: "Teacher notes, learning assessments, tutor reports"
  }
];

const DocumentUploadForm = ({ studentId, onComplete, onBack }: DocumentUploadFormProps) => {
  const [uploads, setUploads] = useState<DocumentUpload[]>([]);
  const [activeType, setActiveType] = useState<string | null>(null);
  
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
            ? { ...upload, status: 'error' } 
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
  
  const handleUpload = async (files: File[]) => {
    if (!activeType) return;
    
    const newFiles = files.map(file => ({
      id: `${Date.now()}-${file.name}`,
      name: file.name,
      type: activeType,
      size: file.size,
      progress: 0,
      status: 'uploading' as const,
    }));
    
    setUploads(prev => [...prev, ...newFiles]);
    
    // Process each file
    for (const file of files) {
      try {
        await uploadDocument(file, studentId);
      } catch (err) {
        console.error("Error uploading document:", err);
      }
    }
  };
  
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleUpload,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
    },
    disabled: !activeType || isUploading,
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
          Upload any educational documents that will help us understand your child's learning needs better.
        </p>
      </div>
      
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {documentTypes.map((doc) => (
          <div 
            key={doc.type}
            className={`
              border rounded-lg p-4 cursor-pointer transition-all
              ${activeType === doc.type 
                ? "border-tobey-orange bg-orange-50 ring-1 ring-tobey-orange" 
                : "border-gray-200 hover:border-gray-300"}
            `}
            onClick={() => setActiveType(doc.type)}
          >
            <h3 className="text-base font-medium text-gray-900">{doc.type}</h3>
            <p className="mt-1 text-sm text-gray-500">{doc.description}</p>
            <p className="mt-1 text-xs text-gray-400">Examples: {doc.examples}</p>
          </div>
        ))}
      </div>
      
      {activeType && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Upload {activeType}</h3>
          
          <div 
            {...getRootProps()} 
            className={`
              border-2 border-dashed rounded-lg p-6 text-center transition-colors
              ${isDragActive ? "border-tobey-orange bg-orange-50" : "border-gray-300"}
              ${!activeType || isUploading ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:border-gray-400"}
            `}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <UploadCloud className="h-8 w-8 text-gray-400" />
              <p className="text-sm text-gray-600">
                {isDragActive ? "Drop the files here" : "Drag files here or click to browse"}
              </p>
              <p className="text-xs text-gray-500">
                PDF, DOC, DOCX, JPG, PNG (Max: 10MB)
              </p>
            </div>
          </div>
        </div>
      )}
      
      {uploads.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-2">Uploads</h3>
          <div className="space-y-3">
            {uploads.map((upload) => (
              <div key={upload.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                <div className="flex items-center space-x-3 flex-1">
                  <div className="flex-shrink-0">
                    {upload.status === 'complete' ? (
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    ) : upload.status === 'error' ? (
                      <X className="h-5 w-5 text-red-500" />
                    ) : (
                      <File className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">{upload.name}</p>
                      <p className="text-xs text-gray-500">{upload.type}</p>
                    </div>
                    {upload.status === 'uploading' && (
                      <Progress value={upload.progress} className="h-1 mt-1" />
                    )}
                    <p className="text-xs text-gray-500 mt-1">
                      {upload.status === 'complete' 
                        ? 'Upload complete' 
                        : upload.status === 'error' 
                          ? 'Upload failed' 
                          : 'Uploading...'}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeUpload(upload.id)}
                  className="ml-2 flex-shrink-0 p-1 hover:bg-gray-200 rounded-full"
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
          disabled={!hasUploads && uploads.length === 0}
        >
          {hasUploads ? "Complete Signup" : "Skip for now"}
        </Button>
      </div>
    </div>
  );
};

export default DocumentUploadForm;
