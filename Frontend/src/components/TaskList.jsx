import React, { useContext } from "react";
import { TasksContext } from "@/context/TasksContext";
import TaskItem from "./TaskItem";

const TaskList = () => {
    const { tasks, toggleTaskCompletion, deleteTask, deleteCompleted } = useContext(TasksContext);

    if (!tasks.length) return null;

    return (
        <section className="tasks">
            <div className="delete" onClick={deleteCompleted}>
                <i className="fa-regular fa-square-minus"></i>
                <label>Eliminar completados</label>
            </div>
            <div className="task-list">
                {tasks.map((task, index) => (
                    <TaskItem
                        key={index}
                        task={task}
                        index={index}
                        onToggle={toggleTaskCompletion}
                        onDelete={deleteTask}
                    />
                ))}
            </div>
        </section>
    );
};

export default TaskList;
