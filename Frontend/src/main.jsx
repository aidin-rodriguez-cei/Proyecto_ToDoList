import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TasksProvider } from "./context/TasksContext";
import { ModoOscuroProvider } from "./context/ModoOscuroContext";


ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <ModoOscuroProvider>
        <TasksProvider>
            <App />
        </TasksProvider>
        </ModoOscuroProvider>
    </React.StrictMode>
);

