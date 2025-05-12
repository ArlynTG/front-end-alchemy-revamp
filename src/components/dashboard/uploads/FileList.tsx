
import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import FileItem from './FileItem';

interface FileRecord {
  id: string;
  file_name: string;
  file_type: string | null;
  file_url: string | null;
  doc_type: string | null;
  uploaded_at: string | null;
}

interface FileListProps {
  files: FileRecord[];
  isLoading: boolean;
}

const FileList: React.FC<FileListProps> = ({ files, isLoading }) => {
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

  if (isLoading) {
    return (
      <div className="space-y-2 mt-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-3 p-3 border rounded-lg">
            <Skeleton className="h-10 w-10 rounded-md" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-3 w-[100px]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (files.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 border-2 border-dashed rounded-lg mt-4">
        <AlertTriangle className="mx-auto h-8 w-8 mb-2" />
        <p>No academic records found for this student</p>
        <p className="text-sm">Upload new documents using the area above</p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-2 mt-4"
    >
      <h3 className="font-medium text-gray-700 mb-2">Uploaded Documents</h3>
      {files.map((file) => (
        <motion.div key={file.id} variants={itemVariants}>
          <FileItem
            id={file.id}
            fileName={file.file_name}
            fileType={file.file_type}
            fileUrl={file.file_url}
            uploadDate={file.uploaded_at}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default FileList;
