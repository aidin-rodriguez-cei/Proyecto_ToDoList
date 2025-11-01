// ==========================
// Importaciones y configuración básica
// (Traigo bcrypt para encriptar, jwt para tokens, mi JWT_SECRET del config,
//  y los modelos de Usuario y Tarea para trabajar con la base de datos)
// ==========================
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import User from "../models/User.js";
import Task from "../models/Task.js";

// ==========================
// GET /users - Trae todos los usuarios (sin contraseñas)
// (Solo devuelvo info pública, oculto el campo password)
// ==========================
export const getAllUsers = async (_req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // excluyo password
    res
      .status(200)
      .json({ data: users, message: "Usuarios obtenidos correctamente" });
  } catch (e) {
    console.error(e); // para ver errores en consola mientras desarrollo
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// POST /auth/register - Registro de usuario
// (Valido que no exista, encripto la contraseña y genero un token de sesión)
// ==========================
export const registerUser = async (req, res) => {
  try {
    const { name, username, password } = req.body;

    // Reviso si ya hay un usuario con ese username
    const exists = await User.findOne({ username });
    if (exists)
      return res.status(400).json({ message: "El usuario ya existe" });

    // Encripto la contraseña antes de guardar
    const hashed = await bcrypt.hash(password, 10);

    // Creo y guardo el usuario
    const user = new User({ name, username, password: hashed });
    await user.save();

    // Creo el token para que quede logueado al registrarse
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    // Quito la contraseña del objeto que devuelvo
    const { password: _, ...userResponse } = user.toObject();

    res
      .status(200)
      .json({
        data: userResponse,
        message: "Usuario registrado con éxito",
        token,
      });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// POST /auth/login - Inicio de sesión
// (Verifico usuario y contraseña, y devuelvo un token si todo está bien)
// ==========================
export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Busco el usuario por su username
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "usuario no existente" });

    // Comparo la contraseña que envió con la guardada en la base
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Clave incorrecta" });

    // Si coincide, genero un token con una expiración
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: "1h" });

    // Armo la respuesta sin el password e incluyo el token
    const { password: _, ...userResponse } = user.toObject();
    userResponse.token = token;

    res
      .status(200)
      .json({ data: userResponse, message: "Login exitoso", token });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// GET /users/me - Perfil del usuario actual
// (Uso el username que viene del token para traer sus datos sin la contraseña)
// ==========================
export const getProfile = async (req, res) => {
  try {
    const { username } = req.user; // viene del middleware de auth
    const user = await User.findOne({ username }, { password: 0 });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ data: user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// PUT /users/me - Actualizar perfil (nombre e imagen)
// (Solo permito actualizar algunos campos y devuelvo el perfil nuevo)
// ==========================
export const updateProfile = async (req, res) => {
  try {
    const { username } = req.user;
    const { name, image } = req.body;

    // Armo un objeto con lo que sí quiero actualizar
    const update = {};
    if (name) update.name = name;
    if (image?.trim()) update.image = image;

    // Devuelvo el documento actualizado y oculto el password
    const user = await User.findOneAndUpdate(
      { username },
      { $set: update },
      { new: true, select: "-password" }
    );

    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json({ message: "Perfil actualizado", data: user });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

// ==========================
// PUT /users/me/password - Cambiar contraseña
// (Primero confirmo la contraseña actual y luego guardo la nueva encriptada)
// ==========================
export const updatePassword = async (req, res) => {
  try {
    const { username } = req.user;
    const { currentPassword, newPassword } = req.body;

    // Busco al usuario
    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Verifico que la contraseña actual coincida
    const ok = await bcrypt.compare(currentPassword, user.password);
    if (!ok)
      return res.status(400).json({ message: "Contraseña actual incorrecta" });

    // Encripto la nueva contraseña y guardo
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Contraseña actualizada" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: "Error del servidor" });
  }
};

// ==========================
// DELETE /users/me - Eliminar cuenta
// (Borro el usuario y también todas sus tareas asociadas)
// ==========================
export const deleteAccount = async (req, res) => {
  try {
    const { username } = req.user;

    // Elimino el usuario
    const user = await User.findOneAndDelete({ username });
    if (!user)
      return res.status(404).json({ message: "Usuario no encontrado" });

    // Limpio todas las tareas que tenía ese usuario
    await Task.deleteMany({ userId: user._id });

    res.status(200).json({ message: "Cuenta eliminada" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: "Error en el servidor" });
  }
};
