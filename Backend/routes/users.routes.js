// ==========================
// Rutas de usuarios (Users)
// (Aquí defino las rutas relacionadas con la gestión de usuarios)
// ==========================
import { Router } from "express";
import { authenticateToken } from "../middlewares/auth.js"; // Middleware para verificar el token JWT
import {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
  updatePassword,
  deleteAccount,
  getAllUsers,
} from "../controllers/user.controller.js"; // Controlador con las funciones principales

// ==========================
// Creo el router para las rutas de usuarios
// ==========================
const router = Router();

// ==========================
// Rutas públicas (no requieren autenticación)
// ==========================

// Obtengo todos los usuarios (sin contraseñas)
router.get("/users", getAllUsers);

// Registro un nuevo usuario
router.post("/register", registerUser);

// Inicio sesión (login)
router.post("/login", loginUser);

// ==========================
// Rutas privadas (requieren token JWT)
// ==========================

// Obtengo el perfil del usuario autenticado
router.get("/me", authenticateToken, getProfile);

// Actualizo la información del perfil
router.put("/user", authenticateToken, updateProfile);

// Cambio la contraseña del usuario
router.put("/user/password", authenticateToken, updatePassword);

// Elimino la cuenta del usuario
router.delete("/user", authenticateToken, deleteAccount);

// ==========================
// Exporto el router para usarlo en el router principal
// ==========================
export default router;
