import React, { useState, useContext } from "react";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

const Login = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);
  const [form, setForm] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de autenticación
    console.log("Login data:", form);
  };

  return (
    <div className={`page-container ${tema}`}>
      <Header />
      <div className="form-center-container">
        <div className="box-text">
          <h1>¡Hola de nuevo!</h1>
          <p>Inicia sesión y sigue organizando tu día como un experto.</p>
        </div>
        <div className="form-box">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username">Usuario:</label>
            <input
              type="text"
              id="username"
              name="username"
              value={form.username}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Contraseña:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;


