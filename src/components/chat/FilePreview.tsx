
import React from "react";

interface FilePreviewProps {
  filePreview: string;
  fileName: string;
  onRemove: () => void;
}

const FilePreview: React.FC<FilePreviewProps> = ({ filePreview, fileName, onRemove }) => {
  return (
    <div className="border-t border-gray-200 p-4 bg-gray-50 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        {filePreview.startsWith('data:image') ? (
          <img src={filePreview} alt={fileName} className="h-16 rounded" />
        ) : (
          <embed src={filePreview} type="application/pdf" width="60" height="60" />
        )}
        <span className="text-sm">{fileName}</span>
      </div>
      <button 
        onClick={onRemove}
        className="text-gray-500 hover:text-gray-900"
        aria-label="Remove uploaded file"
      >✕</button>
    </div>
  );
};

export default FilePreview;
