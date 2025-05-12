
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle } from "lucide-react";

interface CancellationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onCancel: () => void;
  cancelReason: string | null;
  onReasonChange: (value: string) => void;
}

const CancellationDialog: React.FC<CancellationDialogProps> = ({
  isOpen,
  onClose,
  onCancel,
  cancelReason,
  onReasonChange
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Cancel Subscription</DialogTitle>
          <DialogDescription>
            We're sorry to see you go. Please let us know why you're cancelling so we can improve our service.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <RadioGroup value={cancelReason || ""} onValueChange={onReasonChange} className="space-y-3">
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="too-expensive" id="too-expensive" />
              <Label className="font-normal" htmlFor="too-expensive">
                The service is too expensive
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="not-helpful" id="not-helpful" />
              <Label className="font-normal" htmlFor="not-helpful">
                The service isn't helpful for my student
              </Label>
            </div>
            
            <div className="flex items-start space-x-2">
              <RadioGroupItem value="other-reason" id="other-reason" />
              <Label className="font-normal" htmlFor="other-reason">
                Other reason
              </Label>
            </div>
          </RadioGroup>
          
          <div className="mt-6 bg-amber-50 p-3 rounded-md border border-amber-100">
            <div className="flex gap-2">
              <AlertCircle className="h-5 w-5 text-amber-500" />
              <p className="text-sm text-amber-800 font-medium">Important Notice</p>
            </div>
            <p className="text-sm text-amber-700 mt-1">
              All student data, including progress records and personalized materials, will be permanently deleted 5 days after cancellation.
            </p>
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>
            Keep Subscription
          </Button>
          <Button 
            variant="destructive" 
            onClick={onCancel}
            disabled={!cancelReason}
          >
            Confirm Cancellation
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CancellationDialog;
