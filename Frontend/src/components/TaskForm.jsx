import React, { useState, useContext } from "react";
import { TasksContext } from "@/context/TasksContext";

const TaskForm = ({ onClose }) => {
  const { addTask } = useContext(TasksContext);
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "work",
    prioridad: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePriorityChange = (value) => {
    setForm({ ...form, prioridad: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.titulo.trim() === "") {
      alert("El nombre de la tarea es obligatorio");
      return;
    }
    addTask({ ...form, completada: false });
    resetForm();
    onClose();
  };

  const resetForm = () => {
    setForm({
      titulo: "",
      descripcion: "",
      categoria: "work",
      prioridad: 0,
    });
  };

  return (
    <section id="form">
      <div className="cerrar">
        <button title="Cerrar" onClick={onClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
      <h2>Ingresa una tarea</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="form-title">Nombre de la tarea (*)</label>
        <input
          type="text"
          id="form-title"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <label htmlFor="form-desc">Descripción</label>
        <textarea
          id="form-desc"
          name="descripcion"
          rows="4"
          value={form.descripcion}
          onChange={handleChange}
        />
        <label htmlFor="form-cat">Tipo de tarea</label>
        <select
          id="form-cat"
          name="categoria"
          value={form.categoria}
          onChange={handleChange}
        >
          <option value="work">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="home">Doméstica</option>
          <option value="fun">Entretenimiento</option>
        </select>
        <label>Prioridad</label>
        <div className="custom-radios">
          {[
            { id: "color-1", color: "#434343", value: 0, title: "Ninguna" },
            { id: "color-2", color: "rgb(134, 210, 134)", value: 1, title: "Baja" },
            { id: "color-3", color: "rgb(235, 200, 134)", value: 2, title: "Media" },
            { id: "color-4", color: "rgb(250, 101, 126)", value: 3, title: "Alta" },
          ].map((option) => (
            <div key={option.id}>
              <input
                type="radio"
                id={option.id}
                name="prioridad"
                value={option.value}
                checked={form.prioridad === option.value}
                onChange={() => handlePriorityChange(option.value)}
              />
              <label htmlFor={option.id}>
                <span style={{ backgroundColor: option.color }}>
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                    alt="Checked Icon"
                    title={option.title}
                  />
                </span>
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="btnAdd">
          Agregar
        </button>
      </form>
    </section>
  );
};

export default TaskForm;








