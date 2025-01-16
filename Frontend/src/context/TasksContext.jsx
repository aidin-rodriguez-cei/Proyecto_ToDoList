import React, { createContext, useState, useEffect } from "react";

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const storedTasks = JSON.parse(localStorage.getItem("TASKS")) || [];
        setTasks(storedTasks);
    }, []);

    useEffect(() => {
        localStorage.setItem("TASKS", JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (task) => setTasks([...tasks, task]);
    const deleteTask = (index) => setTasks(tasks.filter((_, i) => i !== index));
    const deleteCompleted = () => setTasks(tasks.filter((task) => !task.completada));
    const toggleTaskCompletion = (index) => {
        setTasks((prevTasks) => {
        const updatedTasks = [...tasks];
        updatedTasks[index].completada = !updatedTasks[index].completada;
        setTasks(updatedTasks);
    });
};
    return (
        <TasksContext.Provider value={{ tasks, addTask, deleteTask, deleteCompleted, toggleTaskCompletion }}>
            {children}
        </TasksContext.Provider>
    );
};
