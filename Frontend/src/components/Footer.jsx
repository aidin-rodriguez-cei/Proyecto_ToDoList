import React from "react";
import "@/css/style.css";
import { useUser } from "@/hooks/useUser"; // 👈 agregado para saber si hay usuario

const Footer = ({ onAddTask }) => {
  const { user } = useUser(); // 👈 obtenemos el usuario actual

  return (
    <footer className="footer">
      {/* Botón para agregar una nueva tarea */}
      {user && ( // 👈 mostramos solo si hay sesión
        <button
          id="add"
          title="Nueva Tarea"
          onClick={onAddTask}
          className="add-task-button"
        >
          <img src="/icons/add.png" alt="Add new" />
        </button>
      )}

      {/* Info */}
      <p className="footer-text">© 2025 To do List - Aidin Rodriguez</p>
    </footer>
  );
};

export default Footer;
