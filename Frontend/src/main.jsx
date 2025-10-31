import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "@/routes";

// Contextos globales
import { UserProvider } from "@/hooks/useUser";
import { ModoOscuroProvider } from "@/context/ModoOscuroContext";
import { ToastProvider } from "@/context/ToastContext";
import { TasksProvider } from "@/context/TasksContext";

// Estilos globales
import "./css/index.css";
import "./css/style.css";
import "./css/filters.css";
import "./css/priority-radios.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ModoOscuroProvider>
        <ToastProvider>
          <TasksProvider>
            <AppRoutes />
          </TasksProvider>
        </ToastProvider>
      </ModoOscuroProvider>
    </UserProvider>
  </React.StrictMode>
);
