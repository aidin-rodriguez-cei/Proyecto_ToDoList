// src/components/TaskItem.jsx
import React from 'react';

const TaskItem = ({ task, index, deleteTask, toggleTaskCompleted }) => {
  return (
    <div className={`task-item ${task.completada ? 'completed' : ''}`} id={`task-${index}`} role="listitem">
      <div className="task-header">
        {/* Checkbox para marcar la tarea como completada */}
        <input
          type="checkbox"
          checked={task.completada}
          onChange={() => toggleTaskCompleted(index)}
          aria-checked={task.completada ? 'true' : 'false'}
          aria-label={`Marcar tarea "${task.titulo}" como completada`}
        />
        <h3>{task.titulo}</h3>
        <button
          title="Eliminar tarea"
          onClick={() => deleteTask(index)}
          aria-label={`Eliminar tarea "${task.titulo}"`}
        >
          <i className="fa-regular fa-trash-can"></i>
        </button>
      </div>
      {task.descripcion && <p className="task-desc">{task.descripcion}</p>}
      <div className="task-meta">
        <span className="category">{task.categoria}</span>
        <span className={`priority priority-${task.prioridad}`}>
          {['Ninguna', 'Baja', 'Media', 'Alta'][task.prioridad]}
        </span>
      </div>
    </div>
  );
};

export default TaskItem;

