import React, { createContext, useEffect, useState } from "react";
import { getCurrentUser, validateToken } from "@/auth";

// URL base de la API 
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1";

// Se crea el contexto de tareas
export const TasksContext = createContext();

// Proveedor del contexto (envuelve toda la app)
export const TasksProvider = ({ children }) => {
  // Estado para el usuario actual
  const [user, setUser] = useState(getCurrentUser());

  // Estado con todas las tareas
  const [tasks, setTasks] = useState([]);

  // Estado de carga (para mostrar mientras se esperan datos)
  const [loading, setLoading] = useState(true);

  // Helper para obtener el token desde localStorage
  const getToken = () => localStorage.getItem("token");

  // Escucha los cambios de sesión (login, logout, etc.)
  useEffect(() => {
    const handleStorageChange = () => {
      const currentUser = getCurrentUser();
      setUser(currentUser);
    };

    // Escucha eventos de cambio 
    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("auth-changed", handleStorageChange);

    // Limpia los listeners cuando el componente se desmonta
    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("auth-changed", handleStorageChange);
    };
  }, []);

  // Carga las tareas del usuario actual
  useEffect(() => {
    const loadTasks = async () => {
      setLoading(true);

      // Si el token no es válido, no carga nada
      if (!(await validateToken())) {
        setTasks([]);
        setLoading(false);
        return;
      }

      try {
        // Llamada a la API para traer tareas del usuario
        const response = await fetch(`${API_URL}/tasks`, {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Error HTTP: ${response.status}`);
        }

        const data = await response.json();

        // Validamos que venga un array de tareas
        if (!Array.isArray(data.data)) {
          throw new Error("Formato de respuesta inválido");
        }

        setTasks(data.data);
      } catch (error) {
        console.error("Error al cargar tareas:", error);
        setTasks([]);
      } finally {
        setLoading(false);
      }
    };

    loadTasks();
  }, [user]);

  // ===== Crear tarea =====
  const addTask = async (task) => {
    const token = getToken();
    if (!token)
      throw new Error("No hay sesión activa. Por favor, inicia sesión.");

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(task),
      });

      if (!response.ok) {
        const errorData = await safeJson(response);
        throw new Error(errorData.message || `Error HTTP: ${response.status}`);
      }

      const data = await response.json();
      setTasks((prev) => [...prev, data.data]);
      return data.data;
    } catch (error) {
      console.error("Error en addTask:", error);
      throw error;
    }
  };

  // ===== Eliminar tarea =====
  const deleteTask = async (taskId) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Quita la tarea del estado local
      setTasks((prev) =>
        prev.filter((task) => task._id !== taskId && task.id !== taskId)
      );
    } catch (error) {
      console.error("Error al eliminar tarea:", error);
      throw error;
    }
  };

  // ===== Marcar tarea como completada o pendiente =====
  const toggleTaskCompletion = async (taskId) => {
    const token = getToken();
    if (!token) return;

    try {
      const task = tasks.find((t) => (t._id || t.id) === taskId);
      if (!task) throw new Error("Tarea no encontrada");

      // Alterna el estado de completado
      const nextDone =
        task.completed !== undefined
          ? !task.completed
          : !Boolean(task.completada);

      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...task,
          completed: nextDone,
          completada: nextDone,
        }),
      });

      if (!response.ok) {
        if (response.status === 401 || response.status === 403) {
          throw new Error("Sesión expirada o token inválido (403)");
        }
        throw new Error(`Error HTTP: ${response.status}`);
      }

      // Actualiza la tarea en el estado
      const { data } = await response.json();
      setTasks((prev) =>
        prev.map((t) => ((t._id || t.id) === taskId ? data : t))
      );
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
      throw error;
    }
  };

  // ===== Editar tarea existente =====
  const editTask = async (taskId, updatedTask) => {
    const token = getToken();
    if (!token) return;

    try {
      const response = await fetch(`${API_URL}/tasks/${taskId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedTask),
      });

      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }

      const { data } = await response.json();

      // Actualiza el estado con la tarea editada
      setTasks((prev) =>
        prev.map((t) => ((t._id || t.id) === taskId ? data : t))
      );
      return data;
    } catch (error) {
      console.error("Error al editar tarea:", error);
      throw error;
    }
  };

  // ===== Eliminar todas las tareas completadas =====
  const deleteCompleted = async () => {
    const completed = tasks.filter((t) =>
      t.completed !== undefined ? t.completed : !!t.completada
    );
    try {
      await Promise.all(
        completed.map((task) => deleteTask(task._id || task.id))
      );
    } catch (error) {
      console.error("Error al eliminar tareas completadas:", error);
      throw error;
    }
  };

  // Proveedor del contexto con todas las funciones y estados
  return (
    <TasksContext.Provider
      value={{
        tasks,
        addTask,
        deleteTask,
        deleteCompleted,
        toggleTaskCompletion,
        editTask,
        user,
        loading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export default TasksProvider;

// ===== Helper extra =====
// Intenta leer JSON sin romper si no hay body en la respuesta
async function safeJson(res) {
  try {
    return await res.json();
  } catch {
    return {};
  }
}
