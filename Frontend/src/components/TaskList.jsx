// src/components/TaskList.jsx
import React from 'react';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, deleteTask, toggleTaskCompleted, deleteCompleted }) => {
  return (
    <section className="tasks">
      <div className="delete" onClick={deleteCompleted}>
        <i className="fa-regular fa-square-minus"></i>
        <label>Eliminar completados</label>
      </div>
      <div className="task-list" id="task-list">
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <TaskItem
              key={index}
              task={task}
              index={index}
              deleteTask={deleteTask}
              toggleTaskCompleted={toggleTaskCompleted}
            />
          ))
        ) : (
          <h3>Nada para hacer</h3>
        )}
      </div>
    </section>
  );
};

export default TaskList;




