import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import "@/css/style.css"; 

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const push = useCallback(
    (message, type = "info", duration = 2500) => {
      const id = crypto.randomUUID?.() || Date.now() + Math.random();
      const toast = { id, message, type };
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => remove(id), duration);
    },
    [remove]
  );

  const api = useMemo(
    () => ({
      success: (msg, duration) => push(msg, "success", duration),
      info: (msg, duration) => push(msg, "info", duration),
      error: (msg, duration) => push(msg, "error", duration),
    }),
    [push]
  );

  return (
    <ToastContext.Provider value={api}>
      {children}

      {/* Contenedor visual de toasts */}
      <div className="toast-container" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={`toast ${t.type}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within <ToastProvider />");
  return ctx;
};


