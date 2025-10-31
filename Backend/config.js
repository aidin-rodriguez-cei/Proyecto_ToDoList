// ===============================
// Importo dependencias 
// ===============================
import dotenv from 'dotenv';
import path from 'path';

// ===============================
// Configuración de rutas
// (creo __dirname para usarlo con archivos estáticos o Vercel)
// ===============================
export const __dirname = path.resolve();

// ===============================
// Cargo las variables de entorno desde el archivo .env
// ===============================
dotenv.config();

// ===============================
// Configuración del servidor
// ===============================

// Puerto del servidor (usa el del entorno o 5000 por defecto)
export const PORT = process.env.PORT || 5000;

// Dominio base de la app (útil para entornos locales o producción)
export const DOMAIN = process.env.DOMAIN || "http://localhost";

// Combino dominio y puerto para obtener la URL completa del servidor
export const FULL_DOMAIN = `${DOMAIN}:${PORT}`;

// ===============================
// Clave secreta para JWT (se usa para firmar los tokens de autenticación)
// ===============================
export const JWT_SECRET = process.env.JWT_SECRET;
