import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheckDouble, faSquare, faPen, faHome, faBriefcase, faCoffee, faMusic, faCheck} from "@fortawesome/free-solid-svg-icons";

const TaskItem = ({ task, index, onToggle, onDelete, onEdit }) => {
    const { titulo, descripcion, categoria, prioridad, completed } = task;
    const prioClass = ["", "low-priority", "medium-priority", "high-priority"][prioridad];
    
  // Función para obtener el icono basado en la categoría de la tarea
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


      return (
        <div className= {`task-item ${prioClass} ${completed ? "completed" : ""} task-dark`}>
          {/* Icono de categoría de tarea */}
          {getCategoryIcon(categoria)}
          
          {/* Información de la tarea */}
          <label className="task-dark">
            <h3>{titulo}</h3>
            <small>{descripcion}</small>
          </label>
          
          {/* Checkbox para marcar la tarea como completada */}
          <div className="borrar task-dark">
            <input 
              type="checkbox" 
              checked={completed} 
              onChange={onToggle}
              id={`checkbox-${index}`} 
            />
            <label htmlFor={`checkbox-${index}`}>
            {task.completed ? (
              <FontAwesomeIcon icon={faCheck} /> // Si la tarea está completada, mostramos un icono de check
              ) : (
              <FontAwesomeIcon icon={faSquare} /> // Si no está completada, mostramos un icono de caja vacía
              )}
            </label>
          </div>
          
          {/* Iconos de eliminación */}
          <div className="borrar task-dark" onClick={() => onDelete(index)}>
            <FontAwesomeIcon icon={faTrashCan} title="Eliminar" />
          </div>
          {/* Iconos de edición */}
          <div className="borrar task-dark" onClick={() => onEdit(task, index)}>
            <FontAwesomeIcon icon={faPen} title="Editar" />
          </div>
        </div>
      );
    };
    
    export default TaskItem;
