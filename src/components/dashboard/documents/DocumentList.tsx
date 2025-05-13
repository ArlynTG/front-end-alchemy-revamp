
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { FileText, FileQuestion, FileImage, Clock, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Document {
  id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  uploaded_at: string;
  processed: boolean;
}

interface DocumentListProps {
  studentId: string;
  refreshTrigger: number;
}

const DocumentList: React.FC<DocumentListProps> = ({ studentId, refreshTrigger }) => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDocuments = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch documents for the student
        const { data, error } = await supabase
          .from('uploads')
          .select('id, file_name, file_url, file_type, uploaded_at, processed')
          .eq('uuid', studentId)
          .order('uploaded_at', { ascending: false });

        if (error) {
          throw error;
        }

        setDocuments(data || []);
      } catch (err) {
        console.error('Error fetching documents:', err);
        setError('Unable to load documents');
      } finally {
        setIsLoading(false);
      }
    };

    if (studentId) {
      fetchDocuments();
    }
  }, [studentId, refreshTrigger]);

  // Helper function to determine the icon to display based on file type
  const getFileIcon = (fileType: string) => {
    const type = fileType.toLowerCase();
    
    if (type === 'pdf') return <FileText className="h-5 w-5 text-red-500" />;
    if (type === 'doc' || type === 'docx') return <FileText className="h-5 w-5 text-blue-500" />;
    if (type === 'jpg' || type === 'jpeg' || type === 'png') return <FileImage className="h-5 w-5 text-green-500" />;
    
    return <FileQuestion className="h-5 w-5 text-gray-500" />;
  };

  // Format the date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (isLoading) {
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Documents</h3>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center p-2 border rounded-md">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="ml-3 space-y-1 flex-1">
                <Skeleton className="h-4 w-1/3" />
                <Skeleton className="h-3 w-1/4" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-4 border border-red-200 bg-red-50 rounded-md text-red-600">
        <p>{error}</p>
      </div>
    );
  }

  // Show a different view when there are no documents
  if (documents.length === 0) {
    return (
      <div className="mt-4">
        <h3 className="text-sm font-medium mb-2">Documents</h3>
        <div className="p-4 border border-gray-200 rounded-md bg-gray-50 text-center">
          <p className="text-gray-500">No documents uploaded yet</p>
        </div>
      </div>
    );
  }

  const handleDownload = (fileUrl: string, fileName: string) => {
    // Create a temporary link and trigger the download
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium mb-2">Documents ({documents.length})</h3>
      <div className="divide-y divide-gray-200 border border-gray-200 rounded-md">
        {documents.map((doc) => (
          <div key={doc.id} className="p-3 flex items-center justify-between hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              {getFileIcon(doc.file_type)}
              <div>
                <p className="text-sm font-medium text-gray-800">{doc.file_name}</p>
                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                  <Clock className="h-3 w-3 mr-1" />
                  <span>{formatDate(doc.uploaded_at)}</span>
                  {doc.processed && (
                    <span className="ml-2 bg-green-100 text-green-600 px-1.5 rounded-full text-xs">
                      Processed
                    </span>
                  )}
                </div>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="ml-2"
              onClick={() => handleDownload(doc.file_url, doc.file_name)}
            >
              <Download className="h-4 w-4 mr-1" />
              <span className="sr-only sm:not-sr-only sm:text-xs">Download</span>
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentList;
