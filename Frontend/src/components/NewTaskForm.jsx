// src/components/NewTaskForm.jsx
import React, { useState } from 'react';

const NewTaskForm = ({ addNewTask, setShowForm }) => {
  const [taskData, setTaskData] = useState({
    titulo: '',
    descripcion: '',
    categoria: 'work',
    prioridad: 0,
    completada: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (taskData.titulo !== '') {
      addNewTask(taskData);
      setShowForm(false);
    } else {
      // Agregar validación visual o feedback
      alert("El título es obligatorio.");
    }
  };

  return (
    <section id="form">
      <div className="cerrar">
        <button title="Cerrar" onClick={() => setShowForm(false)} aria-label="Cerrar formulario">
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
      <h2 className="header">Ingresa una tarea</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="form-title">Nombre de la tarea (*)</label>
        <input
          type="text"
          name="titulo"
          id="form-title"
          value={taskData.titulo}
          onChange={handleChange}
          required
          aria-required="true"
          aria-label="Título de la tarea"
        />
        <label htmlFor="form-desc">Descripción</label>
        <textarea
          id="form-desc"
          name="descripcion"
          rows="4"
          value={taskData.descripcion}
          onChange={handleChange}
          aria-label="Descripción de la tarea"
        />
        <label htmlFor="form-cat">Tipo de tarea</label>
        <select
          name="categoria"
          id="form-cat"
          value={taskData.categoria}
          onChange={handleChange}
          aria-label="Categoría de la tarea"
        >
          <option value="work">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="home">Doméstica</option>
          <option value="fun">Entretenimiento</option>
        </select>
        <label>Prioridad</label>
        <div className="custom-radios">
          {[0, 1, 2, 3].map((prio) => (
            <div key={prio}>
              <input
                type="radio"
                id={`color-${prio}`}
                name="prioridad"
                value={prio}
                checked={taskData.prioridad === prio}
                onChange={handleChange}
                aria-label={`Prioridad ${['Ninguna', 'Baja', 'Media', 'Alta'][prio]}`}
              />
              <label htmlFor={`color-${prio}`}>
                <span>
                  <img
                    src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/242518/check-icn.svg"
                    title={prio === 0 ? 'Ninguna' : prio === 1 ? 'Baja' : prio === 2 ? 'Media' : 'Alta'}
                    alt="Icono de prioridad"
                  />
                </span>
              </label>
            </div>
          ))}
        </div>
        <button type="submit" className="btnAdd" aria-label="Agregar tarea">
          Agregar
        </button>
      </form>
    </section>
  );
};

export default NewTaskForm;


