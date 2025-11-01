import React, { useContext, useState } from "react";
import { TasksContext } from "@/context/TasksContext";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components/TaskForm";
import PrioritySelect from "@/components/PrioritySelect";
import CustomSelect from "@/components/CustomSelect";
import { useToast } from "@/context/ToastContext";

// Componente principal que muestra todas las tareas y los filtros
const TaskList = () => {
  const { tasks, loading, deleteTask, toggleTaskCompletion } =
    useContext(TasksContext);
  const toast = useToast(); // Muestra mensajes tipo "toast"

  // Guarda la tarea que se está editando 
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Filtros de prioridad, categoría y estado
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Comprueba si una tarea está completada 
  const isDone = (task) =>
    task.completed !== undefined ? task.completed : !!task.completada;

  // Aplica los filtros seleccionados a la lista de tareas
  const filteredTasks = tasks.filter((task) => {
    // Filtro por prioridad
    if (priorityFilter !== "all") {
      const filterValue = parseInt(priorityFilter);
      if (filterValue === 0) {
        // Si el filtro es "sin prioridad"
        if (
          task.prioridad !== 0 &&
          task.prioridad !== undefined &&
          task.prioridad !== null
        )
          return false;
      } else {
        // Para otras prioridades
        if (task.prioridad !== filterValue) return false;
      }
    }

    // Filtro por categoría
    if (categoryFilter !== "all" && task.categoria !== categoryFilter)
      return false;

    // Filtro por estado (completadas o pendientes)
    if (statusFilter === "completed" && !isDone(task)) return false;
    if (statusFilter === "pending" && isDone(task)) return false;

    return true; // Si pasa todos los filtros se muestra
  });

  // Cuando se hace clic en editar tarea
  const handleEditTask = (task) => {
    setTaskToEdit(task);
  };

  // Muestra mensaje de carga
  if (loading) {
    return (
      <div className="back section-back">
        <p className="task-dark">Cargando tareas...</p>
      </div>
    );
  }

  // Muestra mensaje si no hay tareas
  if (!tasks.length) {
    return (
      <div className="back section-back">
        <img src="/icons/yoga.png" alt="No tasks" />
        <p className="task-dark">Nada para hacer</p>
      </div>
    );
  }

  // Render principal con los filtros y la lista de tareas
  return (
    <section className="tasks">
      {/* Sección de filtros */}
      <div className="filters">
        {/* Filtro de prioridad */}
        <div className="filter-group">
          <label>Prioridad:</label>
          <PrioritySelect
            value={priorityFilter}
            onChange={(e) => setPriorityFilter(e.target.value)}
          />
        </div>

        {/* Filtro de categoría */}
        <div className="filter-group">
          <label>Tipo:</label>
          <CustomSelect
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            options={[
              { value: "all", label: "Todas", color: "#868e96" },
              { value: "work", label: "Trabajo", color: "#4dabf7" },
              { value: "personal", label: "Personal", color: "#e599f7" },
              { value: "home", label: "Doméstica", color: "#51cf66" },
              { value: "fun", label: "Entretenimiento", color: "#ffd43b" },
            ]}
          />
        </div>

        {/* Filtro de estado */}
        <div className="filter-group">
          <label>Estado:</label>
          <CustomSelect
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            options={[
              { value: "all", label: "Todas", color: "#868e96" },
              { value: "completed", label: "Completadas", color: "#51cf66" },
              { value: "pending", label: "Pendientes", color: "#ffd43b" },
            ]}
          />
        </div>
      </div>

      {/* Listado de tareas */}
      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskItem
            key={task._id || task.id || `task-${Math.random()}`}
            task={task}
            // Alterna el estado completado
            onToggle={async () => {
              const wasDone = isDone(task);
              await toggleTaskCompletion(task._id || task.id, !wasDone);

              if (wasDone) {
                toast.info("Tarea pendiente");
              } else {
                toast.success("¡Tarea completada!");
              }
            }}
            // Elimina la tarea
            onDelete={async () => {
              await deleteTask(task._id || task.id);
              toast.error("¡Tarea eliminada!");
            }}
            // Abre el formulario para editar
            onEdit={() => handleEditTask(task)}
          />
        ))}
      </div>

      {/* Si hay una tarea seleccionada para editar, se muestra el formulario */}
      {taskToEdit && (
        <TaskForm onClose={() => setTaskToEdit(null)} taskToEdit={taskToEdit} />
      )}
    </section>
  );
};

export default TaskList;
