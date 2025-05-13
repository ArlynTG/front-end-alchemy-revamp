
import { Toaster as SonnerToaster } from "sonner";

// Use shadcn-styled toaster
export function Toaster() {
  return (
    <SonnerToaster 
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        className: "border-border shadow-lg",
        descriptionClassName: "text-muted-foreground",
      }}
    />
  );
}
