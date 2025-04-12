
import React, { useState } from "react";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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
  React.useEffect(() => {
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
