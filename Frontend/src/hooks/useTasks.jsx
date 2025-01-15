import { useState, useEffect } from 'react';

const useTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem('TASKS')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem('TASKS', JSON.stringify(tasks));
  }, [tasks]);

  const addNewTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));
  const toggleTaskCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completada: !task.completada } : task
    );
    setTasks(updatedTasks);
  };
  const deleteCompleted = () => setTasks(tasks.filter(task => !task.completada));

  return {
    tasks,
    addNewTask,
    deleteTask,
    toggleTaskCompleted,
    deleteCompleted,
  };
};

export default useTasks;


