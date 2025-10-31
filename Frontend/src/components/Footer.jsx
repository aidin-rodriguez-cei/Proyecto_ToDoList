import React from "react";
import "@/css/style.css";
import { useUser } from "@/hooks/useUser";

// Componente Footer: muestra el pie de página y el botón para crear nuevas tareas
const Footer = ({ onAddTask }) => {
  // Hook personalizado que obtiene los datos del usuario actual
  const { user } = useUser();

  return (
    <footer className="footer">
      {/* Si hay un usuario logueado, se muestra el botón para añadir tareas */}
      {user && (
        <button
          id="add"
          title="Nueva Tarea"
          onClick={onAddTask}
          className="add-task-button"
        >
          <img src="/icons/add.png" alt="Add new" />
        </button>
      )}

      {/* Texto con la información del pie de página */}
      <p className="footer-text">© 2025 To do List - Aidin Rodriguez</p>
    </footer>
  );
};

export default Footer;
