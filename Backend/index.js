// ===============================
// Importo las dependencias
// ===============================
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js";
import { PORT, DOMAIN } from "./config.js";

// ===============================
// Configuración de variables de entorno
// ===============================
// Cargo las variables desde el archivo .env
dotenv.config();

// ===============================
// Conexión a la base de datos MongoDB
// ===============================
// Uso la URL guardada en la variable DB_MOBILE del .env
mongoose
  .connect(process.env.DB_MOBILE)
  .then(() => console.log("✅ Conectado a MongoDB - Database: to-do-list"))
  .catch((err) => console.error("❌ No se pudo conectar a MongoDB:", err));

// ===============================
// Inicio del servidor
// ===============================
// Levanto el servidor y muestro el dominio y puerto en consola
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en ${DOMAIN}:${PORT}`);
});
