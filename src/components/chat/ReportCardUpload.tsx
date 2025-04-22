
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Upload } from "lucide-react";

interface ReportCardUploadProps {
  onUploadComplete: (text: string) => void;
}

const ReportCardUpload: React.FC<ReportCardUploadProps> = ({ onUploadComplete }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Only accept PDF and image files
    if (!file.type.match('application/pdf|image/*')) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF or image file",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('https://n8n.tobeystutor.com/webhook/extract-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      if (data.text) {
        onUploadComplete(data.text);
        toast({
          title: "Success",
          description: "Report card uploaded successfully",
        });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Upload failed",
        description: "Failed to process the report card",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 p-4 bg-white rounded-lg shadow-md border border-gray-200">
      <h3 className="text-lg font-medium mb-4">Upload Report Card</h3>
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept="application/pdf,image/*"
          onChange={handleFileUpload}
          disabled={isLoading}
          className="flex-1"
        />
        <Button disabled={isLoading} variant="outline">
          <Upload className="h-4 w-4 mr-2" />
          {isLoading ? "Uploading..." : "Upload"}
        </Button>
      </div>
    </div>
  );
};

export default ReportCardUpload;
