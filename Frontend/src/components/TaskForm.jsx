import React, { useState, useContext, useEffect } from "react";
import { TasksContext } from "@/context/TasksContext";

const TaskForm = ({ onClose, taskToEdit }) => {
  const { addTask, editTask } = useContext(TasksContext);

  // Estado del formulario
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "",
    prioridad: 0,
  });

  // Rellenar el formulario con los datos de la tarea a editar
  useEffect(() => {
    if (taskToEdit) {
      setForm({
        titulo: taskToEdit.titulo,
        descripcion: taskToEdit.descripcion,
        categoria: taskToEdit.categoria,
        prioridad: taskToEdit.prioridad,
      });
    }
  }, [taskToEdit]);

  // Manejar los cambios en los inputs del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Manejar el cambio de prioridad
  const handlePriorityChange = (value) => {
    setForm({ ...form, prioridad: value });
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.titulo.trim() === "") {
      alert("El nombre de la tarea es obligatorio");
      return;
    }
    
    if (taskToEdit) {
      // Si estamos editando una tarea, la actualizamos
      editTask(taskToEdit.index, { ...form, completada: taskToEdit.completada });
    } else {
      // Si estamos añadiendo una tarea, la agregamos
      addTask({ ...form, completada: false });
    }

    resetForm();
    onClose();
  };

  // Restablecer el formulario
  const resetForm = () => {
    setForm({
      titulo: "",
      descripcion: "",
      categoria: "",
      prioridad: 0,
    });
  };

  return (
    <section id="form">
      <div className="cerrar task-dark">
        <button title="Cerrar" onClick={onClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </div>
      <h2 className="task-dark">{taskToEdit ? "Editar tarea" : "Nueva tarea"}</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="form-title">Nombre de la tarea (*)</label>
        <input className="task-dark"
          type="text"
          id="form-title"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />
        <label htmlFor="form-desc">Descripción</label>
        <textarea className="task-dark"
          id="form-desc"
          name="descripcion"
          rows="4"
          value={form.descripcion}
          onChange={handleChange}
        />
        <label htmlFor="form-cat">Tipo de tarea</label>
        <select className="task-dark"
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
          {taskToEdit ? "Guardar" : "Agregar"}
        </button>
      </form>
    </section>
  );
};

export default TaskForm;









