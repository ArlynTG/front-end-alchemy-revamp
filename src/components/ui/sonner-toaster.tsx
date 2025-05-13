
import { Toaster } from "sonner";

export function SonnerToaster() {
  return (
    <Toaster 
      className="group toast-root"
      toastOptions={{
        classNames: {
          toast: "group toast",
          description: "toast-description"
        }
      }}
      position="top-right"
      closeButton
      richColors
    />
  );
}
