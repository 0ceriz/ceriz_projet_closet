import { useState, type ReactNode } from "react";
import { NotificationContext } from "./notificationContext";

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [message, setMessage] = useState<string | null>(null);

  const showMessage = (message: string) => {
    setMessage(message);
  };

  const clearMessage = () => {
    setMessage(null);
  };

  return (
    <NotificationContext
      value={{
        message,
        showMessage,
        clearMessage,
      }}
    >
      {children}
    </NotificationContext>
  );
}
