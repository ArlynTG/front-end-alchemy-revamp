
import React from 'react';
import { FileText, Image, FileArchive, File, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface FileItemProps {
  id: string;
  fileName: string;
  fileType: string | null;
  fileUrl: string | null;
  uploadDate: string | null;
}

const FileItem: React.FC<FileItemProps> = ({
  id,
  fileName,
  fileType,
  fileUrl,
  uploadDate,
}) => {
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
    if (!fileType) return <File className="h-5 w-5" />;
    
    // PDF files
    if (fileType.includes('pdf')) {
      return <FileText className="h-5 w-5 text-red-500" />;
    }
    
    // Image files
    if (fileType.includes('image')) {
      return <Image className="h-5 w-5 text-blue-500" />;
    }
    
    // Archive files
    if (fileType.includes('zip') || 
        fileType.includes('rar') || 
        fileType.includes('tar') || 
        fileType.includes('gz')) {
      return <FileArchive className="h-5 w-5 text-amber-500" />;
    }
    
    // Word documents
    if (fileType.includes('msword') || 
        fileType.includes('wordprocessingml') ||
        fileType.includes('document')) {
      return <FileText className="h-5 w-5 text-blue-700" />;
    }
    
    // Excel files
    if (fileType.includes('excel') || 
        fileType.includes('spreadsheetml') || 
        fileType.includes('sheet')) {
      return <FileText className="h-5 w-5 text-green-600" />;
    }
    
    // Default file icon
    return <File className="h-5 w-5 text-gray-500" />;
  };

  const handleViewFile = () => {
    if (fileUrl) {
      window.open(fileUrl, '_blank');
    } else {
      toast({
        title: "File unavailable",
        description: "The file URL is not available.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="flex items-center justify-between p-3 border rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
      <div className="flex items-center space-x-3">
        <div className="p-2 bg-white rounded-md shadow-sm">
          {getFileIcon(fileType)}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium truncate max-w-[200px] md:max-w-[300px]">
              {fileName}
            </p>
            <Check className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-xs text-gray-500">
            {formatDate(uploadDate)}
          </p>
        </div>
      </div>
      <Button
        size="sm"
        variant="ghost"
        className="ml-2"
        onClick={handleViewFile}
      >
        View
      </Button>
    </div>
  );
};

export default FileItem;
