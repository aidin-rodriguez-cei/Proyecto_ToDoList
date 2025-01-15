// src/pages/Login.jsx (o la ruta correspondiente)
import React from 'react';
import { useUser } from '../hooks/useUser'; // Importa el hook useUser

const Login = () => {
  const { login } = useUser(); // Obtén la función login desde el contexto

  const handleSubmit = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    login({ username }) // Usa la función login desde el contexto
      .then(() => {
        alert('Inicio de sesión exitoso');
        window.location.href = '/'; // Redirigir al inicio (ajusta si necesitas otro comportamiento)
      })
      .catch(() => {
        alert('Error al iniciar sesión');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Iniciar Sesión</h2>
      <label>Usuario</label>
      <input type="text" name="username" required />
      <label>Contraseña</label>
      <input type="password" name="password" required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;


