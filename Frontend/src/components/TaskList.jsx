import React, { useContext, useState } from "react";
import { TasksContext } from "@/context/TasksContext";
import TaskItem from "@/components/TaskItem";
import TaskForm from "@/components//TaskForm";
import { useToast } from "@/context/ToastContext"; //

const TaskList = () => {
  const { tasks, toggleTaskCompletion, deleteTask, deleteCompleted } =
    useContext(TasksContext);
  const toast = useToast(); //

  // Estado para editar una tarea
  const [taskToEdit, setTaskToEdit] = useState(null);

  // Estados para almacenar los valores de los filtros
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Helper estado done
  const isDone = (task) =>
    task.completed !== undefined ? task.completed : !!task.completada;

  // Filtrar tareas según los filtros seleccionados
  const filteredTasks = tasks.filter((task) => {
    if (priorityFilter !== "all" && task.prioridad !== parseInt(priorityFilter)) return false;
    if (categoryFilter !== "all" && task.categoria !== categoryFilter) return false;
    if (statusFilter === "completed" && !isDone(task)) return false;
    if (statusFilter === "pending" && isDone(task)) return false;
    return true;
  });

  // Manejo de edición de tarea
  const handleEditTask = (task, index) => {
    setTaskToEdit({ ...task, index }); 
  };

  if (!tasks.length) {
    return (
      <div className="back section-back">
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
        <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="1">Baja</option>
          <option value="2">Media</option>
          <option value="3">Alta</option>
        </select>

        <label>Tipo de tarea</label>
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="work">Trabajo</option>
          <option value="personal">Personal</option>
          <option value="home">Doméstica</option>
          <option value="fun">Entretenimiento</option>
        </select>

        <label>Estado</label>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Todas</option>
          <option value="completed">Completadas</option>
          <option value="pending">Pendientes</option>
        </select>
      </div>

      {/* Botón de eliminar tareas completadas */}
      <div
        className="delete"
        onClick={() => {
          deleteCompleted();
          toast.error("¡Tareas completadas eliminadas!"); 
        }}
      >
        <i className="fa-regular fa-square-minus"></i>
        <label>Eliminar completados</label>
      </div>

      <div className="task-list">
        {/* Mostrar tareas filtradas */}
        {filteredTasks.map((task, index) => (
          <TaskItem
            key={task.id ?? index}
            task={task}
            index={index}
            onToggle={() => {
              const wasDone = isDone(task);
              toggleTaskCompletion(index);

              if (wasDone) {
                toast.info("Tarea pendiente"); 
              } else {
                toast.success("¡Tarea completada!"); 
              }
            }}
            onDelete={() => {
              deleteTask(index);
              toast.error("¡Tarea eliminada!"); 
            }}
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



