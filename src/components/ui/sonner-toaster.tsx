
import { Toaster as SonnerToaster } from "sonner";

export function SonnerToaster() {
  return (
    <SonnerToaster 
      position="top-right"
      closeButton
      richColors
      toastOptions={{
        className: "group toast-root",
        descriptionClassName: "toast-description",
      }}
    />
  );
}
