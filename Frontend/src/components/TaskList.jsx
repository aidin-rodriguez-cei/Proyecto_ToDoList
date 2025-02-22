import React, { useContext, useState } from "react";
import { TasksContext } from "@/context/TasksContext";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components//TaskForm";

const TaskList = () => {
  const { tasks, toggleTaskCompletion, deleteTask, deleteCompleted } =
    useContext(TasksContext);
  // Estado para editar una tarea
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Estados para almacenar los valores de los filtros
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filtrar tareas según los filtros seleccionados
  const filteredTasks = tasks.filter((task) => {
    // Filtrar por prioridad
    if (
      priorityFilter !== "all" &&
      task.prioridad !== parseInt(priorityFilter)
    ) {
      return false;
    }
    // Filtrar por categoría
    if (categoryFilter !== "all" && task.categoria !== categoryFilter) {
      return false;
    }

    // Filtrar por estado: completado o pendiente
    if (statusFilter === "completed" && !task.completed) {
      return false;
    }
    if (statusFilter === "pending" && task.completed) {
      return false;
    }
    // Si pasa todos los filtros
    return true;
  });

  // Manejo de edición de tarea
  const handleEditTask = (task, index) => {
    setTaskToEdit({ ...task, index }); 
  };

  if (!tasks.length) {
    return (
      <div className="back section-back">
        {/* Imagen y frase cuando no haya tareas */}
        <img src="public/icons/yoga.png" alt="No tasks" />
        <p className="task-dark">Nada para hacer</p>
      </div>
    );
  }

  return (
    <section className="tasks">
      {/* Filtros */}
      <div className="filters">
        <label>Prioridad</label>
        <select
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="1">Baja</option>
          <option value="2">Media</option>
          <option value="3">Alta</option>
        </select>

        <label>Tipo de tarea</label>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="work">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="home">Doméstica</option>
          <option value="fun">Entretenimiento</option>
        </select>

        <label>Estado</label>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      {/* Botón de eliminar tareas completadas */}
      <div className="delete" onClick={deleteCompleted}>
        <i className="fa-regular fa-square-minus"></i>
        <label>Eliminar completados</label>
      </div>

      <div className="task-list">
        {/* Mostrar tareas filtradas */}
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            index={index}
            onToggle={() => toggleTaskCompletion(index)}
            onDelete={() => deleteTask(index)}
            onEdit={() => handleEditTask(task, index)}
          />
        ))}
      </div>

      {/* Formulario de edición */}
      {taskToEdit && (
        <TaskForm onClose={() => setTaskToEdit(null)} taskToEdit={taskToEdit} />
      )}
    </section>
  );
};

export default TaskList;
