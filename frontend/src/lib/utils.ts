import { clsx, type ClassValue } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_ERROR_MESSAGE =
  "An error occurred. Please try again later.";

export const DEFAULT_SUCCESS_MESSAGE = "Success! 🎉";

export const showToast = (toastType: "error" | "success", message?: string) => {
  // Show a toast notification
  switch (toastType) {
    case "error":
      toast.error(message ?? DEFAULT_ERROR_MESSAGE);
      break;
    case "success":
      toast.success(message ?? DEFAULT_SUCCESS_MESSAGE);
      break;
    default:
      toast(message);
  }
};
