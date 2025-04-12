
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw } from "lucide-react";

interface ConnectionErrorAlertProps {
  errorMessage: string;
  onRetry: () => void;
}

const ConnectionErrorAlert: React.FC<ConnectionErrorAlertProps> = ({ 
  errorMessage, 
  onRetry 
}) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{errorMessage}</p>
        <Button 
          variant="outline" 
          size="sm" 
          className="self-start mt-2"
          onClick={onRetry}
        >
          <RefreshCw className="h-4 w-4 mr-2" /> Retry Connection
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionErrorAlert;
