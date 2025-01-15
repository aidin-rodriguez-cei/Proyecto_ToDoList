// src/components/Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { ModoOscuroContext } from '../context/ModoOscuroContext';

const Header = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);

  return (
    <header className={tema === 'dark' ? 'dark' : 'light'}>
      <nav className="flex justify-between items-center p-4">
        {/* Menú y título */}
        <div className="flex items-center gap-4">
          <img src="images/menu.png" alt="Menú" className="w-8 h-8" />
          <h1 className="text-2xl font-bold text-blue-600">To Do List</h1>
        </div>

        {/* Enlaces de navegación */}
        <ul className="flex gap-6">
          <li><NavLink to="/" className="hover:underline">Inicio</NavLink></li>
          <li><NavLink to="/Login" className="hover:underline">Iniciar sesión</NavLink></li>
          <li><NavLink to="/Registro" className="hover:underline">Regístrate</NavLink></li>
          <li><NavLink to="/Admin" className="hover:underline">Admin</NavLink></li>
        </ul>

        {/* Icono de usuario y botón para cambiar el tema */}
        <div className="flex items-center gap-4">
          <img src="images/user.png" alt="Login" className="w-8 h-8" />
          <button
            className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
            onClick={toggleTema}
          >
            Cambiar Tema
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;  // Exportación por defecto



