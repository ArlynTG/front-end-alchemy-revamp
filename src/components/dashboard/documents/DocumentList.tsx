
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileIcon, CheckCircle, ChevronLeft, ChevronRight, Trash2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { useDocumentUpload } from '@/hooks/useDocumentUpload';

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
  const [documentToDelete, setDocumentToDelete] = useState<DocumentItem | null>(null);
  
  const { getDocumentUrl, deleteDocument } = useDocumentUpload({
    bucketName: 'documents'
  });

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
        console.log('Fetching documents for student ID:', studentId);
        
        // List files directly from the student's folder in the documents bucket
        const { data, error } = await supabase.storage
          .from('documents')
          .list(studentId, {
            limit: 100,
            sortBy: { column: 'created_at', order: 'desc' }
          });

        if (error) {
          console.error('List error:', error);
          throw error;
        }

        if (data && data.length > 0) {
          console.log('Found documents:', data.length);
          
          // Process and format file data
          const formattedDocuments = data.map(file => ({
            id: file.id,
            name: file.name, // Use the original filename
            created_at: file.created_at,
            fileType: getFileType(file.name),
            processed: true, // Assume processed for now
            size: file.metadata?.size || 0
          }));

          setDocuments(formattedDocuments);
          setTotalPages(Math.ceil(formattedDocuments.length / documentsPerPage));
        } else {
          console.log('No documents found for student ID:', studentId);
          setDocuments([]);
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

  const handleViewDocument = async (document: DocumentItem) => {
    try {
      const url = await getDocumentUrl(studentId, document.name);
      if (url) {
        window.open(url, '_blank');
      } else {
        toast({
          title: "Could not retrieve document",
          description: "The document URL could not be generated",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error viewing document:', error);
      toast({
        title: "Error",
        description: "Could not open the document",
        variant: "destructive"
      });
    }
  };

  const handleDeleteConfirmed = async () => {
    if (!documentToDelete) return;
    
    try {
      const success = await deleteDocument(studentId, documentToDelete.name);
      if (success) {
        // Remove from local state
        setDocuments(docs => docs.filter(doc => doc.id !== documentToDelete.id));
        // Recalculate pagination
        setTotalPages(Math.ceil((documents.length - 1) / documentsPerPage));
        if (currentPage > Math.ceil((documents.length - 1) / documentsPerPage)) {
          setCurrentPage(Math.max(1, currentPage - 1));
        }
      }
    } catch (error) {
      console.error('Delete error:', error);
    } finally {
      setDocumentToDelete(null);
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
            <TableHead className="text-right">Actions</TableHead>
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
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost" 
                    size="sm" 
                    onClick={() => handleViewDocument(doc)}
                    className="text-blue-600 hover:text-blue-800 p-1 h-auto"
                  >
                    <ExternalLink size={16} />
                    <span className="sr-only">View</span>
                  </Button>

                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost" 
                        size="sm" 
                        className="text-red-600 hover:text-red-800 p-1 h-auto"
                        onClick={() => setDocumentToDelete(doc)}
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Confirm Deletion</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this document? This action cannot be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel onClick={() => setDocumentToDelete(null)}>
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteConfirmed} className="bg-red-600 hover:bg-red-700">
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
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
