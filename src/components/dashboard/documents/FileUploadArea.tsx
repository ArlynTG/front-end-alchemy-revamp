import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Upload, FileUp, AlertCircle } from "lucide-react";
import { useDocumentUpload } from "@/hooks/useDocumentUpload";
import { cn } from "@/lib/utils";

interface FileUploadAreaProps {
  onUploadComplete?: (uploadId: string) => void;
  maxFiles?: number;
  acceptedFileTypes?: string;
  maxSizeMB?: number;
  className?: string;
  studentId?: string; // Add studentId prop
  onUploadSuccess?: () => void; // Add onUploadSuccess prop
}

const FileUploadArea = ({
  onUploadComplete,
  maxFiles = 5,
  acceptedFileTypes = "application/pdf,image/*,.doc,.docx",
  maxSizeMB = 10,
  className,
  onUploadSuccess, // Add to destructured props
  studentId // Add to destructured props
}: FileUploadAreaProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const { uploads, uploadFile, removeUpload } = useDocumentUpload();
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    processFiles(Array.from(files));
    
    // Clear the input for consistent behavior
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const processFiles = (fileList: File[]) => {
    // Check if adding these files would exceed the max files limit
    if (uploads.length + fileList.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only upload a maximum of ${maxFiles} files.`,
        variant: "destructive"
      });
      return;
    }

    for (const file of fileList) {
      // Validate file size
      if (file.size > maxSizeBytes) {
        toast({
          title: "File too large",
          description: `"${file.name}" exceeds the maximum file size of ${maxSizeMB}MB.`,
          variant: "destructive"
        });
        continue;
      }

      // Validate file type based on the accept attribute pattern
      const fileExtension = file.name.split('.').pop()?.toLowerCase();
      const fileType = file.type.toLowerCase();
      
      const acceptTypes = acceptedFileTypes.split(',');
      const isAccepted = acceptTypes.some(type => {
        if (type === '*' || type === '*/*') return true;
        if (type.endsWith('/*') && fileType.startsWith(type.replace('/*', '/'))) return true;
        if (type.startsWith('.') && `.${fileExtension}` === type.toLowerCase()) return true;
        return fileType === type;
      });

      if (!isAccepted) {
        toast({
          title: "Unsupported file type",
          description: `"${file.name}" is not an accepted file type.`,
          variant: "destructive"
        });
        continue;
      }

      // Upload the file
      const uploadId = uploadFile(file, "document");
      
      // Notify parent component if callback provided
      if (onUploadComplete && uploadId) {
        onUploadComplete(uploadId);
      }
      
      // Call onUploadSuccess if provided
      if (onUploadSuccess) {
        onUploadSuccess();
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("w-full", className)}>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={triggerFileInput}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragging ? "border-primary bg-muted/50" : "border-muted-foreground/25 hover:border-muted-foreground/50",
          "flex flex-col items-center justify-center gap-4"
        )}
      >
        <div className="rounded-full bg-primary/10 p-3">
          <FileUp className="h-6 w-6 text-primary" />
        </div>
        
        <div>
          <p className="font-medium mb-1">Drag and drop files or click to upload</p>
          <p className="text-sm text-muted-foreground">
            Upload up to {maxFiles} files (Max {maxSizeMB}MB each)
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Accepted formats: PDF, Word documents, and images
          </p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept={acceptedFileTypes}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {uploads.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="font-medium text-sm">Uploads ({uploads.length}/{maxFiles})</h3>
          
          {uploads.map((upload) => (
            <div key={upload.id} className="flex items-center justify-between p-3 border rounded-md bg-background">
              <div className="flex items-center gap-3 overflow-hidden">
                {upload.status === 'uploading' ? (
                  <div className="h-10 w-10 rounded-full border-2 border-t-primary border-r-transparent animate-spin"></div>
                ) : upload.status === 'error' ? (
                  <AlertCircle className="h-10 w-10 text-destructive" />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Upload className="h-5 w-5 text-primary" />
                  </div>
                )}
                
                <div className="truncate">
                  <p className="font-medium truncate">{upload.name}</p>
                  {upload.status === 'uploading' && (
                    <div className="w-full bg-muted rounded-full h-1.5 mt-1">
                      <div className="bg-primary h-1.5 rounded-full" style={{ width: `${upload.progress || 0}%` }}></div>
                    </div>
                  )}
                  {upload.status === 'success' && <p className="text-xs text-green-600">Upload complete</p>}
                  {upload.status === 'error' && <p className="text-xs text-destructive">{upload.error || "Upload failed"}</p>}
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-destructive"
                onClick={() => removeUpload(upload.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUploadArea;
