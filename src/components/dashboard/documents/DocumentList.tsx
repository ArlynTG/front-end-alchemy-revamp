
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileIcon, CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';

interface DocumentListProps {
  studentId: string;
  refreshTrigger: number;
}

interface DocumentItem {
  id: string;
  name: string;
  created_at: string;
  fileType: string;
  processed: boolean;
  size: number;
}

const DocumentList: React.FC<DocumentListProps> = ({ studentId, refreshTrigger }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const documentsPerPage = 10;

  const getFileType = (fileName: string): string => {
    const extension = fileName.split('.').pop();
    return extension ? `.${extension.toLowerCase()}` : '';
  };

  const getFileIconClass = (fileType: string): string => {
    if (fileType.includes('pdf')) return 'text-red-500';
    if (fileType.includes('doc')) return 'text-blue-500';
    if (fileType.includes('jpg') || fileType.includes('jpeg') || fileType.includes('png')) return 'text-green-500';
    return 'text-gray-500';
  };

  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        console.log('Fetching documents...');
        
        // Get user session to retrieve user ID
        const { data: { session } } = await supabase.auth.getSession();
        
        // Directly use the session without showing any error
        const userId = session?.user?.id;
        
        // Use a default path if no userId is available (for testing)
        // This will let us see documents even without authentication
        const path = userId || 'temp';
        console.log('Using storage path:', path);
        
        // First check if bucket exists before proceeding
        const { data: buckets } = await supabase.storage.listBuckets();
        
        // Check if our bucket exists
        const bucketExists = buckets?.some(bucket => bucket.name === 'documents');
        
        if (!bucketExists) {
          console.error('Bucket "documents" does not exist');
          toast({
            title: "Storage configuration issue",
            description: "Document storage is not properly configured",
            variant: "destructive"
          });
          setDocuments([]);
          setLoading(false);
          return;
        }
        
        // Fetch files from storage
        const { data, error } = await supabase.storage
          .from('documents')
          .list(path, {
            limit: 100,
            sortBy: { column: 'created_at', order: 'desc' }
          });

        if (error) {
          console.error('List error:', error);
          throw error;
        }

        if (data) {
          // Process and format file data
          const formattedDocuments = data.map(file => ({
            id: file.id,
            name: file.name.split('_').slice(1).join('_'), // Remove timestamp prefix
            created_at: file.created_at,
            fileType: getFileType(file.name),
            processed: true, // Assume processed for now
            size: file.metadata?.size || 0
          }));

          setDocuments(formattedDocuments);
          setTotalPages(Math.ceil(formattedDocuments.length / documentsPerPage));
        }
      } catch (err) {
        console.error('Error fetching documents:', err);
        toast({
          title: "Could not load documents",
          description: "There was an issue retrieving your documents",
          variant: "destructive"
        });
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDocuments();
  }, [studentId, refreshTrigger]);

  const paginatedDocuments = documents.slice(
    (currentPage - 1) * documentsPerPage,
    currentPage * documentsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="text-center py-8 border border-dashed rounded-md">
        <p className="text-gray-500 mb-2">Upload your first document to get started with personalized learning goals</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Document Name</TableHead>
            <TableHead>Upload Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedDocuments.map((doc) => (
            <TableRow key={doc.id} className="hover:bg-gray-50">
              <TableCell className="flex items-center space-x-2">
                <FileIcon className={`h-4 w-4 ${getFileIconClass(doc.fileType)}`} />
                <span className="font-medium truncate max-w-[180px] md:max-w-[250px] lg:max-w-[300px]">
                  {doc.name}
                </span>
              </TableCell>
              <TableCell>
                {format(new Date(doc.created_at), 'MM/dd/yyyy \'at\' h:mm a')}
              </TableCell>
              <TableCell>
                <span className="text-xs uppercase font-medium text-gray-500">{doc.fileType}</span>
              </TableCell>
              <TableCell>
                {doc.processed ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <div className="flex space-x-1 items-center">
                    <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse"></div>
                    <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse delay-150"></div>
                    <div className="h-2 w-2 bg-amber-500 rounded-full animate-pulse delay-300"></div>
                  </div>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {totalPages > 1 && (
        <div className="flex items-center justify-end space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={prevPage} 
            disabled={currentPage <= 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={nextPage} 
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default DocumentList;
