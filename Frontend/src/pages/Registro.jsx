import React, { useState, useContext } from "react";
import { ModoOscuroContext } from "@/context/ModoOscuroContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "@/css/style.css";

const Registro = () => {
  const { tema, toggleTema } = useContext(ModoOscuroContext);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Registro
    console.log("Datos de registro:", form);
  };

  return (
    <div className={`page-container ${tema}`}>
      <Header />
      <div className="form-center-container">
        <div className="box-text">
          <h1>¡Organiza tu día!</h1>
          <p>
            {" "}
            Regístrate y empieza a gestionar tus tareas de forma eficiente.
          </p>
        </div>
        <div className="form-box">
          <h2>Regístrate</h2>
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
            <label htmlFor="email">Correo:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
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
            <button type="submit">Registrarme</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registro;
