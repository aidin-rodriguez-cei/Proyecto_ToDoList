import { useState, useEffect } from "react";

// Hook personalizado para gestionar tareas
const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Cargar tareas desde localStorage al iniciar
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("TASKS")) || [];
    setTasks(storedTasks);
  }, []);

  // Guardar tareas en localStorage al cambiar
  useEffect(() => {
    localStorage.setItem("TASKS", JSON.stringify(tasks));
  }, [tasks]);

  // Función para agregar una tarea
  const addTask = (task) => setTasks([...tasks, task]);

  // Función para eliminar una tarea
  const deleteTask = (index) =>
    setTasks(tasks.filter((_, i) => i !== index));

  // Eliminar tareas completadas
  const deleteCompleted = () =>
    setTasks(tasks.filter((task) => !task.completada));

  // Cambiar estado de completada
  const toggleTaskCompletion = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completada: !task.completada } : task
      )
    );
  };

  // Función para editar una tarea
  const editTask = (index, updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) => (i === index ? updatedTask : task))
    );
  };

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
