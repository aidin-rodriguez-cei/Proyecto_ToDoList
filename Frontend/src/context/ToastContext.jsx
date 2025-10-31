import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import "@/css/style.css";

// Creamos el contexto que usaremos para mostrar los mensajes (toasts)
const ToastContext = createContext(null);

// Proveedor del contexto: envuelve la app y permite usar toasts desde cualquier componente
export const ToastProvider = ({ children }) => {
  // Guardamos todos los toasts activos en un array
  const [toasts, setToasts] = useState([]);

  // Función para eliminar un toast por su id
  const remove = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Función para crear un nuevo toast
  const push = useCallback(
    (message, type = "info", duration = 2500) => {
      // Creamos un id único (con crypto o fecha aleatoria)
      const id = crypto.randomUUID?.() || Date.now() + Math.random();

      // Creamos el objeto con la info del toast
      const toast = { id, message, type };

      // Lo agregamos al array
      setToasts((prev) => [...prev, toast]);

      // Lo eliminamos automáticamente después de un tiempo
      setTimeout(() => remove(id), duration);
    },
    [remove]
  );

  // Creamos un objeto con funciones más específicas para cada tipo de toast
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
      {/* Renderiza el resto de la app */}
      {children}

      {/* Contenedor visual donde se muestran los toasts */}
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

// Hook personalizado para usar los toasts más fácilmente
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast <ToastProvider />"); // Aviso si no está dentro del provider
  return ctx;
};
