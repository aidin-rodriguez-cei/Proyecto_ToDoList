import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "@/routes";
import { TasksProvider } from "@/context/TasksContext";
import { ModoOscuroProvider } from "@/context/ModoOscuroContext";
import { UserProvider } from '@/hooks/useUser';
import { ToastProvider } from "@/context/ToastContext"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
      <ModoOscuroProvider>
        <TasksProvider>
          <ToastProvider>  
            <AppRoutes />
          </ToastProvider>
        </TasksProvider>
      </ModoOscuroProvider>
    </UserProvider>
  </React.StrictMode>
);
