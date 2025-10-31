import { useState, useEffect } from "react";
import { getCurrentUser } from "../auth";

/* ================= HOOK PERSONALIZADO: useTasks ================= */
/* Este hook gestiona todas las tareas del usuario actual:
   - Carga y guarda automáticamente desde localStorage
   - Permite agregar, editar, eliminar y marcar tareas como completadas */

const useTasks = () => {
  // Estado local para las tareas
  const [tasks, setTasks] = useState([]);

  // Obtiene el usuario actual (si está logueado)
  const user = getCurrentUser();

  // Clave única para guardar las tareas de cada usuario en localStorage
  const storageKey = user ? `TASKS_${user.username}` : null;

  /* ================= CARGA INICIAL ================= */
  // Carga las tareas desde localStorage al montar el componente
  useEffect(() => {
    if (storageKey) {
      const storedTasks = JSON.parse(localStorage.getItem(storageKey)) || [];
      setTasks(storedTasks);
    } else {
      setTasks([]); // Si no hay usuario, no se muestran tareas
    }
  }, [storageKey]);

  /* ================= GUARDADO AUTOMÁTICO ================= */
  // Guarda las tareas en localStorage cada vez que cambian
  useEffect(() => {
    if (storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(tasks));
    }
  }, [tasks, storageKey]);

  /* ================= FUNCIONES CRUD ================= */

  // Agregar una nueva tarea
  const addTask = (task) => setTasks([...tasks, task]);

  // Eliminar una tarea por índice
  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  // Eliminar todas las tareas completadas
  const deleteCompleted = () =>
    setTasks(tasks.filter((task) => !task.completada));

  // Cambiar el estado de “completada” de una tarea
  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completada: !task.completada } : task
      )
    );
  };

  // Editar una tarea existente
  const editTask = (index, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? updatedTask : task))
    );
  };

  /* ================= EXPORTS ================= */
  return {
    tasks,
    addTask,
    deleteTask,
    deleteCompleted,
    toggleTaskCompletion,
    editTask,
  };
};

export default useTasks;
