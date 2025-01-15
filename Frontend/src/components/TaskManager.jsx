// src/components/TaskManager.jsx
import React, { useState, useEffect } from 'react';
import TaskList from './TaskList';
import NewTaskForm from './NewTaskForm';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    // Obtener las tareas desde localStorage
    const savedTasks = JSON.parse(localStorage.getItem('TASKS')) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    // Guardar las tareas en localStorage cada vez que cambien
    localStorage.setItem('TASKS', JSON.stringify(tasks));
  }, [tasks]);

  const addNewTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completada: !task.completada } : task
    );
    setTasks(updatedTasks);
  };

  const deleteCompleted = () => {
    const newTasks = tasks.filter((task) => !task.completada);
    setTasks(newTasks);
  };

  return (
    <div className="task-manager">
      {showForm ? (
        <NewTaskForm addNewTask={addNewTask} setShowForm={setShowForm} />
      ) : (
        <TaskList
          tasks={tasks}
          deleteTask={deleteTask}
          toggleTaskCompleted={toggleTaskCompleted}
          deleteCompleted={deleteCompleted}
        />
      )}
    </div>
  );
};

export default TaskManager;


