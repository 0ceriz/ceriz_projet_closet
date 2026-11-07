import { createContext } from "react";

interface NotificationContextValue {
  message: string | null;
  showMessage: (message: string) => void;
  clearMessage: () => void;
}

export const NotificationContext =
  createContext<NotificationContextValue | null>(null);
