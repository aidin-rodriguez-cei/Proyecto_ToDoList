import React from "react";
import "@/css/TaskCheckbox.css";

// Componente que muestra una casilla de verificación personalizada para marcar tareas completadas
const TaskCheckbox = ({ id, checked, onChange }) => {
  // Maneja el cambio de estado del checkbox (marcar o desmarcar)
  const handleChange = (e) => {
    e.stopPropagation(); // Evita que el clic afecte otros elementos
    if (typeof onChange === "function") {
      onChange(!checked); // Invierte el estado actual y lo pasa al padre
    }
  };

  return (
    <div className="task-checkbox">
      {/* Input de tipo checkbox, oculto visualmente y controlado con React */}
      <input
        type="checkbox"
        id={`checkbox-${id}`} // ID único basado en el id de la tarea
        checked={checked} // Valor controlado desde el componente padre
        onChange={handleChange} // Llama a la función cuando se cambia el estado
        aria-label={
          checked ? "Marcar como pendiente" : "Marcar como completada"
        } 
      />

      {/* Etiqueta personalizada que reemplaza el checkbox por un SVG */}
      <label
        htmlFor={`checkbox-${id}`}
        className={checked ? "checked" : ""} // Agrega clase si está completada
      >
        {/* Fondo cuadrado del checkbox */}
        <svg
          aria-hidden="true"
          focusable="false"
          className="checkbox-box"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M0 96C0 60.7 28.7 32 64 32H384c35.3 0 64 28.7 64 64V416c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V96z"
          />
        </svg>

        {/* Icono de check que aparece solo cuando está marcado */}
        {checked && (
          <svg
            aria-hidden="true"
            focusable="false"
            className="check-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
          >
            <path
              fill="currentColor"
              d="M438.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L160 338.7 393.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"
            />
          </svg>
        )}
      </label>
    </div>
  );
};

export default TaskCheckbox;
