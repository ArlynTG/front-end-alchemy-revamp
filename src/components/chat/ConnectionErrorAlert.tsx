
import React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Settings } from "lucide-react";

interface ConnectionErrorAlertProps {
  errorMessage: string;
  onRetry: () => void;
  onShowSettings: () => void;
}

const ConnectionErrorAlert: React.FC<ConnectionErrorAlertProps> = ({ 
  errorMessage, 
  onRetry,
  onShowSettings 
}) => {
  return (
    <Alert variant="destructive" className="mb-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Connection Error</AlertTitle>
      <AlertDescription className="flex flex-col gap-2">
        <p>{errorMessage}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={onRetry}
          >
            <RefreshCw className="h-4 w-4 mr-2" /> Try Different Proxy
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className="flex items-center"
            onClick={onShowSettings}
          >
            <Settings className="h-4 w-4 mr-2" /> Update Webhook URL
          </Button>
        </div>
        <p className="text-xs mt-2 text-gray-200">
          Tip: If connection issues persist, try using a different webhook URL in the settings.
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default ConnectionErrorAlert;
