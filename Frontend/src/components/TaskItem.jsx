import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faCheckDouble, faSquare } from "@fortawesome/free-solid-svg-icons";

const TaskItem = ({ task, index, onToggle, onDelete }) => {
    const { titulo, descripcion, categoria, prioridad, completada } = task;
    const prioClass = ["", "low-priority", "medium-priority", "high-priority"][prioridad];

    return (
        <div className={`task-item ${prioClass} ${completada ? "completed" : ""}`}>
            {/* Icono de categoría de tarea */}
            <i className={`fa-solid fa-${categoria}`} title={categoria}></i>
            
            {/* Información de la tarea */}
            <label>
                <h3>{titulo}</h3>
                <small>{descripcion}</small>
            </label>
            
            {/* Checkbox para marcar la tarea como completada */}
            <div className="borrar">
                <input 
                    type="checkbox" 
                    checked={completada} 
                    onChange={() => onToggle(index)} 
                />
                <label>
                    {completada ? 
                        <FontAwesomeIcon icon={faCheckDouble} /> : 
                        <FontAwesomeIcon icon={faSquare} />
                    }
                </label>
            </div>
            
            {/* Icono de eliminación */}
            <div className="borrar" onClick={() => onDelete(index)}>
                <FontAwesomeIcon icon={faTrashCan} title="Eliminar" />
            </div>
        </div>
    );
};

export default TaskItem;
