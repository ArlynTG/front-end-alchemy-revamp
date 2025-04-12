
import React, { useState, useEffect } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import { DEFAULT_WEBHOOK_URL } from "@/hooks/useChatWithWebhook";

interface SettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentWebhookUrl: string;
  onSave: (url: string) => void;
  onReset: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({
  open,
  onOpenChange,
  currentWebhookUrl,
  onSave,
  onReset
}) => {
  const [tempWebhookUrl, setTempWebhookUrl] = useState(currentWebhookUrl);

  // Update the temp URL when the dialog opens
  useEffect(() => {
    if (open) {
      setTempWebhookUrl(currentWebhookUrl);
    }
  }, [open, currentWebhookUrl]);

  const handleSave = () => {
    onSave(tempWebhookUrl);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Chat Settings</DialogTitle>
          <DialogDescription>
            Configure the chat connection settings
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium" htmlFor="webhook-url">
              Webhook URL
            </label>
            <Input
              id="webhook-url"
              value={tempWebhookUrl}
              onChange={(e) => setTempWebhookUrl(e.target.value)}
              placeholder="Enter webhook URL"
            />
            <p className="text-xs text-gray-500">
              The URL for the n8n webhook that handles chat messages
            </p>
          </div>
          
          <div className="bg-amber-50 border border-amber-200 rounded-md p-3 text-amber-800">
            <div className="flex gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
              <div className="text-xs space-y-1">
                <h4 className="font-medium">Troubleshooting Connection Issues</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Make sure your webhook URL is publicly accessible</li>
                  <li>The app will try multiple CORS proxies if one fails</li>
                  <li>If all proxies fail, try using a different webhook URL</li>
                  <li>Check that your webhook expects a "prompt" field and returns a "reply" field</li>
                  <li>Verify your n8n workflow is active and properly configured</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={onReset}>
            Reset to Default
          </Button>
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SettingsDialog;
