import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "@/routes";
import { TasksProvider } from "@/context/TasksContext";
import { ModoOscuroProvider } from "@/context/ModoOscuroContext";
import { UserProvider } from '@/hooks/useUser';

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserProvider>
    <ModoOscuroProvider>
      <TasksProvider>
        <AppRoutes />
      </TasksProvider>
    </ModoOscuroProvider>
    </UserProvider>
  </React.StrictMode>
);
