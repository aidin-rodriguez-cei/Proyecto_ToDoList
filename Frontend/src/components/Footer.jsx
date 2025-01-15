import React, { useContext } from 'react';
import { ModoOscuroContext } from '../context/ModoOscuroContext';

export const Footer = ({ setShowForm }) => {
  const { tema } = useContext(ModoOscuroContext);

  return (
    <footer className={`${tema === 'dark' ? 'dark' : 'light'} p-4`}>
      {/* Botón para agregar una nueva tarea */}
      <button
        id="add"
        title="Nueva Tarea"
        onClick={() => setShowForm(true)}
        className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
      >
        <img src="images/add.png" alt="Add new" className="w-6 h-6" />
      </button>

      {/* Información del pie de página */}
      <p className="mt-4 text-center text-sm">
        © 2025 To Do List. Todos los derechos reservados.
      </p>
    </footer>
  );
};

export default Footer;

