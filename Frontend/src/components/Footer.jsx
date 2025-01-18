import React from "react";
import "@/css/style.css";

const Footer = ({ onAddTask }) => {
  return (
    <footer className="footer">
      {/* Botón para agregar una nueva tarea */}
      <button
        id="add"
        title="Nueva Tarea"
        onClick={onAddTask}
        className="add-task-button"
      >
        <img src="/icons/add.png" alt="Add new" />
      </button>

      {/* Info */}
      <p className="footer-text">© 2025 To do List - Aidin Rodriguez</p>
    </footer>
  );
};

export default Footer;
