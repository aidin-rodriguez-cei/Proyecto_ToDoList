// src/context/TasksContext.jsx
import React, { createContext, useEffect, useMemo, useRef, useState } from "react";

export const TasksContext = createContext();

// Lee el usuario actual desde localStorage
function getStoredUser() {
  try {
    const raw = localStorage.getItem("user");
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

// Lee tareas desde una clave
function readTasks(key) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

// Guarda tareas en una clave
function writeTasks(key, tasks) {
  try {
    localStorage.setItem(key, JSON.stringify(tasks));
  } catch {}
}

export const TasksProvider = ({ children }) => {
  // 👇 “tick” para forzar re-render cuando cambia la auth (login/logout)
  const [userTick, setUserTick] = useState(0);
  useEffect(() => {
    const handler = () => setUserTick((t) => t + 1);
    window.addEventListener("auth-changed", handler);
    return () => window.removeEventListener("auth-changed", handler);
  }, []);

  // username se recalcula en cada render; userTick fuerza el re-render cuando cambie la auth
  const username = (getStoredUser() || {})?.username || null;

  // Clave por usuario (o invitado)
  const STORAGE_KEY = useMemo(
    () => (username ? `TASKS:${username}` : "TASKS:guest"),
    [username, userTick]
  );

  const [tasks, setTasks] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  // Para evitar efectos dobles en StrictMode y manejar cambio de clave
  const lastKeyRef = useRef(null);

  // 1) Hidratar SIEMPRE que cambie la clave (usuario distinto / invitado)
  useEffect(() => {
    // reset estado de hidratación en cada cambio de clave
    setHydrated(false);

    // Migración desde la clave antigua "TASKS" si la nueva está vacía
    let loaded = readTasks(STORAGE_KEY);
    if ((!loaded || loaded.length === 0) && STORAGE_KEY !== "TASKS") {
      const legacy = readTasks("TASKS");
      if (legacy && legacy.length > 0) {
        // migra sin borrar la legacy (compatibilidad)
        writeTasks(STORAGE_KEY, legacy);
        loaded = legacy;
      }
    }

    setTasks(Array.isArray(loaded) ? loaded : []);
    lastKeyRef.current = STORAGE_KEY;
    setHydrated(true);
  }, [STORAGE_KEY]);

  // 2) Guardar cuando cambien (solo después de hidratar y en la clave actual)
  useEffect(() => {
    if (!hydrated) return;
    if (lastKeyRef.current !== STORAGE_KEY) return; // seguridad ante carreras
    writeTasks(STORAGE_KEY, tasks);
    // Compat opcional: también mantener en "TASKS"
    writeTasks("TASKS", tasks);
  }, [tasks, hydrated, STORAGE_KEY]);

  // --- CRUD --- //
  const addTask = (task) =>
    setTasks((prev) => [
      ...prev,
      {
        id: crypto.randomUUID?.() || Date.now(),
        completed: task.completed ?? task.completada ?? false,
        completada: task.completada ?? task.completed ?? false,
        ...task,
      },
    ]);

  const deleteTask = (index) =>
    setTasks((prev) => prev.filter((_, i) => i !== index));

  const deleteCompleted = () =>
    setTasks((prev) => prev.filter((t) => !(t.completed || t.completada)));

  const toggleTaskCompletion = (index) =>
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index
          ? {
              ...t,
              completed: !Boolean(t.completed || t.completada),
              completada: !Boolean(t.completed || t.completada),
              updatedAt: Date.now(),
            }
          : t
      )
    );

  const editTask = (index, updatedTask) =>
    setTasks((prev) =>
      prev.map((t, i) =>
        i === index
          ? {
              ...t,
              ...updatedTask,
              completed:
                updatedTask.completed ??
                updatedTask.completada ??
                t.completed ??
                t.completada ??
                false,
              completada:
                updatedTask.completada ??
                updatedTask.completed ??
                t.completada ??
                t.completed ??
                false,
            }
          : t
      )
    );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        deleteCompleted,
        toggleTaskCompletion,
        editTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};




