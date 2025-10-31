// ==========================
// Archivo principal de rutas
// (Agrupa todas las rutas del proyecto en un solo lugar)
// ==========================
import { Router } from "express";
import usersRoutes from "./users.routes.js"; // rutas relacionadas con usuarios
import tasksRoutes from "./tasks.routes.js"; // rutas relacionadas con tareas

// ==========================
// Creo el enrutador principal
// ==========================
const router = Router();

// ==========================
// Uso de los diferentes módulos de rutas
// (Así mantengo el código ordenado y modular)
// ==========================
router.use(usersRoutes);
router.use(tasksRoutes);


// Healthcheck 
router.get("/health", (req, res) => {
  res.status(200).json({ ok: true, env: process.env.NODE_ENV || "development" });
});


// ==========================
// Exporto el router para usarlo en app.js
// ==========================
export default router;
