import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  // The toaster has been migrated to use the sonner library directly
  // We keep this component for backwards compatibility but it doesn't
  // render anything as toast display is handled by the sonner Toaster
  return null;
}
