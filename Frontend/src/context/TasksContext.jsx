import React, { createContext, useState, useEffect } from "react";

// Crea el contexto de tareas
export const TasksContext = createContext();

// Proveedor del contexto de tareas
export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  // Recupera las tareas guardadas en localStorage al cargar la aplicación
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("TASKS")) || [];
    setTasks(storedTasks);
  }, []);

  // Guarda las tareas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  // Función para añadir una tarea
  const addTask = (task) => setTasks([...tasks, task]);

  // Función para eliminar una tarea por su índice
  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));

  // Función para eliminar tareas completadas
  const deleteCompleted = () => {
    setTasks((prevTasks) => prevTasks.filter((task) => !task.completed));
  };

  // Función para marcar una tarea como completada o incompleta
  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, idx) =>
        idx === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Función para editar una tarea
  const editTask = (index, updatedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = updatedTask;
    setTasks(updatedTasks);
  };

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
