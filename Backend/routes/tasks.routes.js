// ==========================
// Rutas de tareas (Tasks)
// (Aquí defino todas las rutas que manejan las tareas del usuario)
// ==========================
import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js"; // middleware para proteger las rutas con JWT
import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js"; // funciones del controlador

// ==========================
// Creo el router para las tareas
// ==========================
const router = Router();

// ==========================
// Endpoints protegidos con JWT
// (Solo accesibles si el usuario tiene un token válido)
// ==========================

// Obtengo todas las tareas del usuario
router.get("/tasks", authenticateToken, getTasks);

// Creo una nueva tarea
router.post("/tasks", authenticateToken, createTask);

// Actualizo una tarea existente
router.put("/tasks/:taskId", authenticateToken, updateTask);

// Elimino una tarea por su ID
router.delete("/tasks/:taskId", authenticateToken, deleteTask);

// ==========================
// Exporto las rutas para usarlas en el router principal
// ==========================
export default router;
