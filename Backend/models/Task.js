// ==========================
// Modelo de Tareas (Task)
// (Defino cómo se guarda cada tarea en la base de datos MongoDB)
// ==========================
import mongoose from "mongoose";

// ==========================
// Esquema de la tarea
// (Cada campo representa una propiedad de la tarea)
// ==========================
const taskSchema = new mongoose.Schema(
  {
    // Título de la tarea (obligatorio)
    titulo: {
      type: String,
      required: true,
    },

    // Descripción más detallada (opcional)
    descripcion: {
      type: String,
      default: "",
    },

    // Categoría de la tarea (solo acepta las opciones definidas)
    categoria: {
      type: String,
      enum: ["work", "personal", "home", "fun"],
      default: "personal",
    },

    // Nivel de prioridad (entre 0 y 3)
    prioridad: {
      type: Number,
      min: 0,
      max: 3,
      default: 0,
    },

    // Indica si la tarea está completada o no
    completada: {
      type: Boolean,
      default: false,
    },

    // Relación con el usuario que creó la tarea
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    // Guarda automáticamente las fechas de creación y actualización
    timestamps: true,
  }
);

// ==========================
// Exporto el modelo para usarlo en los controladores
// ==========================
const Task = mongoose.model("Task", taskSchema);
export default Task;
