// ==========================
// Importaciones de modelos
// (Uso los modelos de Usuario y Tarea de Mongoose)
// ==========================
import User from "../models/User.js";
import Task from "../models/Task.js";

// ==========================
// GET /tasks - Lista tareas del usuario logueado
// (Busco el usuario por username que viene del token y luego traigo sus tareas)
// ==========================
export const getTasks = async (req, res) => {
  try {
    const { username } = req.user; // del token/req.user
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Traigo las tareas del usuario y las ordeno por fecha de creación (más nuevas primero)
    const tasks = await Task.find({ userId: user._id }).sort({ createdAt: -1 });
    res.status(200).json({ data: tasks });
  } catch (e) {
    console.error(e); // para ver el error en consola mientras desarrollo
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// POST /tasks - Crea una tarea nueva
// (Primero valido que exista el usuario y luego guardo la tarea con su userId)
// ==========================
export const createTask = async (req, res) => {
  try {
    const { username } = req.user; // del token/req.user
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Tomo los datos que llegan del body (pongo "personal" como categoría por defecto)
    const { titulo, descripcion, categoria = "personal", prioridad } = req.body;
    const task = new Task({
      titulo,
      descripcion,
      categoria,
      prioridad,
      userId: user._id, // relaciono la tarea con el usuario
      completada: false, // arranca en false
    });

    // Guardo y devuelvo la tarea creada
    const saved = await task.save();
    res
      .status(201)
      .json({
        data: saved.toObject({ getters: true }),
        message: "Tarea creada con éxito",
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// PUT /tasks/:taskId - Actualiza una tarea
// (Verifico que la tarea sea del usuario logueado antes de actualizar)
// ==========================
export const updateTask = async (req, res) => {
  try {
    const { username } = req.user; // del token/req.user
    const { taskId } = req.params; // id que viene por URL

    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Me aseguro de que la tarea exista y pertenezca al usuario
    const task = await Task.findOne({ _id: taskId, userId: user._id });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    // Actualizo solo los campos que llegan en el body
    const updated = await Task.findByIdAndUpdate(
      taskId,
      { $set: req.body },
      { new: true }
    );
    res
      .status(200)
      .json({ data: updated, message: "Tarea actualizada con éxito" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// DELETE /tasks/:taskId - Elimina una tarea
// (Primero verifico que la tarea sea del usuario para poder borrarla)
// ==========================
export const deleteTask = async (req, res) => {
  try {
    const { username } = req.user; // del token/req.user
    const { taskId } = req.params;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Borro la tarea solo si pertenece al usuario
    const task = await Task.findOneAndDelete({ _id: taskId, userId: user._id });
    if (!task) return res.status(404).json({ message: "Tarea no encontrada" });

    res.status(200).json({ message: "Tarea eliminada con éxito" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
