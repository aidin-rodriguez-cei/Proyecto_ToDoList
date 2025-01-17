import React from "react";
import "@/css/style.css";

const Footer = ({ onAddTask }) => {
  return (
    <footer>
    {/* Botón para agregar una nueva tarea */}
      <button id="add" title="Nueva Tarea" onClick={onAddTask}>
        <img src="/public/icons/add.png" alt="Add new" />
      </button>

      {/* Información del pie de página */}
      <p className="mt-4 text-center text-sm">
        © 2025 To Do List - Todos los derechos reservados
      </p>
    </footer>
  );
};

export default Footer;
