
import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster 
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
