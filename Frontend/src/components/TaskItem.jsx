import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPen,
  faHome,
  faBriefcase,
  faCoffee,
  faMusic,
} from "@fortawesome/free-solid-svg-icons";
import TaskCheckbox from "./TaskCheckbox";

// Componente que muestra una tarea individual con su info y acciones
const TaskItem = ({ task, onToggle, onDelete, onEdit }) => {
  const { titulo, descripcion, categoria } = task;

  // Maneja compatibilidad entre los nombres "completed" y "completada"
  const done =
    typeof task.completed === "boolean" ? task.completed : !!task.completada;

  // Asegura que la prioridad esté dentro del rango permitido (0 a 3)
  const prioridad = Number.isFinite(task.prioridad) ? task.prioridad : 0;
  const prioClass = ["", "low-priority", "medium-priority", "high-priority"][
    Math.max(0, Math.min(3, prioridad))
  ];

  // Muestra un icono distinto según la categoría de la tarea
  const getCategoryIcon = (category) => {
    switch (category) {
      case "personal":
        return <FontAwesomeIcon icon={faCoffee} title="Personal" />;
      case "work":
        return <FontAwesomeIcon icon={faBriefcase} title="Trabajo" />;
      case "home":
        return <FontAwesomeIcon icon={faHome} title="Doméstica" />;
      case "fun":
        return <FontAwesomeIcon icon={faMusic} title="Entretenimiento" />;
      default:
        return null;
    }
  };

  // Se obtiene el id de la tarea (según venga del backend)
  const taskId = task._id || task.id;
  const checkboxId = `checkbox-${taskId}`;

  return (
    // Contenedor principal de la tarea
    <div
      className={`task-item ${prioClass} ${done ? "completed" : ""} task-dark`}
    >
      {/* Icono de la categoría */}
      {getCategoryIcon(categoria)}

      {/* Título y descripción de la tarea */}
      <label className="task-dark" htmlFor={checkboxId}>
        <h3>{titulo}</h3>
        <small>{descripcion}</small>
      </label>

      {/* Checkbox para marcar como completada */}
      <div className="borrar task-dark">
        <TaskCheckbox
          id={taskId}
          checked={done}
          onChange={() => onToggle(taskId)} // Llama a la función para alternar el estado
        />
      </div>

      {/* Botón de eliminar */}
      <div className="borrar task-dark" onClick={() => onDelete(taskId)}>
        <FontAwesomeIcon icon={faTrashCan} title="Eliminar" />
      </div>

      {/* Botón de editar */}
      <div className="borrar task-dark" onClick={() => onEdit(task)}>
        <FontAwesomeIcon icon={faPen} title="Editar" />
      </div>
    </div>
  );
};

export default TaskItem;
