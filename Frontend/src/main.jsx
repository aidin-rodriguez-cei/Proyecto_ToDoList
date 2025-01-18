import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "@/routes";
import { TasksProvider } from "@/context/TasksContext";
import { ModoOscuroProvider } from "@/context/ModoOscuroContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ModoOscuroProvider>
      <TasksProvider>
        <AppRoutes />
      </TasksProvider>
    </ModoOscuroProvider>
  </React.StrictMode>
);
