import React, { createContext, useState } from 'react';

const TasksContext = createContext();

const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const deleteTask = (index) => {
    setTasks((prevTasks) => prevTasks.filter((_, i) => i !== index));
  };

  const toggleTaskCompleted = (index) => {
    setTasks((prevTasks) =>
      prevTasks.map((task, i) =>
        i === index ? { ...task, completada: !task.completada } : task
      )
    );
  };

  return (
    <TasksContext.Provider value={{ tasks, deleteTask, toggleTaskCompleted }}>
      {children}
    </TasksContext.Provider>
  );
};

export { TasksContext, TasksProvider };


