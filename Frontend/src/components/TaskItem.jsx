import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faCheckSquare, faCircleCheck, faTrashArrowUp, faTrashRestore, faTrashCan, faTrashCanArrowUp, faCheckDouble, faCheckToSlot, faUserCheck, faListCheck, faRoadCircleCheck, faChevronCircleDown, faSquare, faSquareCheck, faSquareBinary, faSquareH } from "@fortawesome/free-solid-svg-icons";

const TaskItem = ({ task, index, onToggle, onDelete }) => {
    const { titulo, descripcion, categoria, prioridad, completada } = task;
    const prioClass = ["", "low-priority", "medium-priority", "high-priority"][prioridad];

    return (
        <div className={`task-item ${prioClass} ${completada ? "completed" : ""}`}>
            <i className={`fa-solid fa-${categoria}`} title={categoria}></i>
            <label>
                <h3>{titulo}</h3>
                <small>{descripcion}</small>
            </label>
            <div className="borrar">
                <input type="checkbox" checked={completada} onChange={() => onToggle(index)} />
                <label>
                    {completada ? <FontAwesomeIcon icon={faCheckDouble} /> : <FontAwesomeIcon icon={faSquare} />}
                </label>
            </div>
            <div className="borrar" onClick={() => onDelete(index)}>
                <FontAwesomeIcon icon={faTrashCan} title="Eliminar" />
            </div>
        </div>
    );
};

export default TaskItem;
