import React, { useState, useContext, useEffect } from "react";
import { TasksContext } from "@/context/TasksContext";
import { useToast } from "@/context/ToastContext";
import "@/css/style.css";

// Componente que sirve para crear o editar tareas
const TaskForm = ({ onClose, taskToEdit }) => {
  const { addTask, editTask } = useContext(TasksContext); // Funciones del contexto de tareas
  const toast = useToast(); // Para mostrar mensajes tipo "toast"

  // Estado inicial del formulario
  const [form, setForm] = useState({
    titulo: "",
    descripcion: "",
    categoria: "personal",
    prioridad: 0,
  });

  // Verifica si se está editando una tarea o creando una nueva
  const isEdit = Boolean(taskToEdit && (taskToEdit._id || taskToEdit.id));
  const taskId = taskToEdit?._id || taskToEdit?.id;

  // Precarga los datos de la tarea si estamos editando
  useEffect(() => {
    if (taskToEdit) {
      setForm({
        titulo: taskToEdit.titulo ?? "",
        descripcion: taskToEdit.descripcion ?? "",
        categoria: taskToEdit.categoria ?? "personal",
        prioridad:
          typeof taskToEdit.prioridad === "number"
            ? taskToEdit.prioridad
            : Number(taskToEdit.prioridad || 0),
      });
    } else {
      // Si no hay tarea para editar, el formulario se limpia
      setForm({
        titulo: "",
        descripcion: "",
        categoria: "personal",
        prioridad: 0,
      });
    }
  }, [taskToEdit]);

  // Maneja los cambios de los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({
      ...f,
      [name]: name === "prioridad" ? Number(value) : value,
    }));
  };

  // Cambia la prioridad cuando se selecciona una opción de los radios
  const handlePriorityChange = (value) => {
    setForm((f) => ({ ...f, prioridad: Number(value) }));
  };

  // Crea el objeto con los datos listos para enviar al backend
  const buildTask = () => {
    const base = {
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      categoria: form.categoria || "personal",
      prioridad: Number(form.prioridad || 0),
    };
    if (!isEdit) {
      base.completada = false; // Solo se agrega cuando se crea una nueva
    }
    return base;
  };

  // Maneja el envío del formulario (crear o editar)
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valida que los campos no estén vacíos
    if (!form.titulo.trim() || !form.descripcion.trim()) {
      toast.error("Por favor, completa todos los campos requeridos");
      return;
    }

    const payload = buildTask();

    try {
      if (isEdit) {
        // Si estamos editando
        await editTask(taskId, payload);
        toast.success("Tarea actualizada");
      } else {
        // Si estamos creando
        const newTask = await addTask(payload);
        if (!newTask?._id) {
          toast.error("Error al crear la tarea");
          return;
        }
        toast.success("Tarea creada");
      }
      onClose?.(); // Cierra el formulario
    } catch (err) {
      console.error(err);
      toast.error("No se pudo guardar la tarea");
    }
  };

  // Renderiza el formulario con todos sus campos
  return (
    <section id="form">
      {/* Botón para cerrar el formulario */}
      <div className="cerrar task-dark">
        <button title="Cerrar" onClick={onClose}>
          <i className="fa-regular fa-circle-xmark"></i>
        </button>
      </div>

      {/* Título dinámico (según si es nueva o edición) */}
      <h2 className="task-dark">{isEdit ? "Editar tarea" : "Nueva tarea"}</h2>

      {/* Formulario */}
      <form onSubmit={handleSubmit}>
        <label htmlFor="form-title">Nombre de la tarea (*)</label>
        <input
          className="task-dark"
          type="text"
          id="form-title"
          name="titulo"
          value={form.titulo}
          onChange={handleChange}
          required
        />

        <label htmlFor="form-desc">Descripción</label>
        <textarea
          className="task-dark"
          id="form-desc"
          name="descripcion"
          rows="4"
          value={form.descripcion}
          onChange={handleChange}
        />

        <label htmlFor="form-cat">Tipo de tarea</label>
        <select
          className="task-dark"
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

        {/* Radios de prioridad */}
        <label>Prioridad</label>
        <div className="priority-radios">
          {[
            {
              id: "priority-0",
              value: 0,
              label: "Sin prioridad",
              className: "priority-none",
            },
            {
              id: "priority-1",
              value: 1,
              label: "Baja",
              className: "priority-low",
            },
            {
              id: "priority-2",
              value: 2,
              label: "Media",
              className: "priority-medium",
            },
            {
              id: "priority-3",
              value: 3,
              label: "Alta",
              className: "priority-high",
            },
          ].map((opt) => (
            <div key={opt.id} className={`priority-radio ${opt.className}`}>
              <input
                type="radio"
                id={opt.id}
                name="prioridad"
                value={opt.value}
                checked={form.prioridad === opt.value}
                onChange={() => handlePriorityChange(opt.value)}
              />
              <label htmlFor={opt.id}>{opt.label}</label>
            </div>
          ))}
        </div>

        {/* Botón para guardar o agregar */}
        <button type="submit" className="btnAdd">
          {isEdit ? "Guardar" : "Agregar"}
        </button>
      </form>
    </section>
  );
};

export default TaskForm;
