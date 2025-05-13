
import { toast as sonnerToast, ToastT, Toast } from "sonner";

// Define the types for our toast system
type ToastProps = Omit<ToastT, "id"> & {
  title?: React.ReactNode;
  description?: React.ReactNode;
  duration?: number;
  variant?: "default" | "destructive" | "success";
  action?: React.ReactNode;
};

const useToast = () => {
  const toast = ({ title, description, variant, action, ...props }: ToastProps) => {
    // Map our variant to sonner styles
    const style: any = {
      backgroundColor: variant === "destructive" ? "var(--destructive)" : undefined,
      color: variant === "destructive" ? "var(--destructive-foreground)" : undefined,
      border: "1px solid var(--border)",
    };

    return sonnerToast(title as string, {
      description,
      action,
      style,
      ...props,
    });
  };

  return { toast };
};

// Simplified toast function for direct access
const toast = ({ title, description, variant, ...props }: ToastProps) => {
  // Map our variant to sonner's toast type
  const options: any = {
    ...props,
  };

  if (variant === "destructive") {
    options.style = {
      backgroundColor: "var(--destructive)",
      color: "var(--destructive-foreground)",
      border: "1px solid var(--destructive)",
    };
  }

  if (variant === "success") {
    options.style = {
      backgroundColor: "var(--success)",
      color: "var(--success-foreground)",
      border: "1px solid var(--success)",
    };
  }

  return sonnerToast(title as string, {
    description,
    ...options,
  });
};

export { useToast, toast };
export type { ToastProps };
