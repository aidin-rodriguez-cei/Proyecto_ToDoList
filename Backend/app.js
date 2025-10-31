// ===============================
// Importo los módulos necesarios
// ===============================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import path from "path";

import apiRouter from "./routes/index.js"; // Rutas principales de la API
import { errorHandler } from "./middlewares/errorHandler.js"; // Middleware de manejo de errores

const app = express();
const __dirname = path.resolve();

// ===============================
// Seguridad y registro de peticiones
// ===============================
// Uso Helmet para agregar cabeceras de seguridad
app.use(helmet());

// Uso Morgan solo en desarrollo para ver las peticiones en consola
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ===============================
// Configuración de CORS (permite que el frontend acceda al backend)
// ===============================
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Para entorno local
      "https://to-do-list.vercel.app", // Dominio de producción 
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: false,
  })
);

// Permite preflight requests (CORS)
app.options("*", cors());

// ===============================
// Configuración de los body parsers (para leer JSON y formularios)
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Compresión global (gzip y brotli para mejorar el rendimiento)
// ===============================
app.use(compression());

// ===============================
// Rutas principales de la API (todas empiezan con /api/v1)
// ===============================
app.use("/api/v1", apiRouter);

// ===============================
// Servir el frontend de React (carpeta /dist de Vite)
// ===============================
const DIST_DIR = path.join(__dirname, "dist");

// Servir archivos estáticos con cache larga excepto index.html, que no se cachea
app.use(
  express.static(DIST_DIR, {
    maxAge: "1y",
    immutable: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith("index.html")) {
        // No cachear el HTML principal
        res.setHeader("Cache-Control", "no-cache");
      } else {
        // Cache para assets (CSS, JS, imágenes)
        res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
      }
    },
  })
);

// Redirige cualquier ruta que no sea /api a index.html
// Esto permite que React maneje el enrutamiento en el frontend
app.get(/^\/(?!api).*/, (_req, res) => {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

// ===============================
// Middleware 404 (ruta no encontrada)
// Si una ruta no existe, pasa al manejador de errores
// ===============================
app.use((req, _res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// ===============================
// Middleware global para manejar errores
// ===============================
app.use(errorHandler);

// ===============================
// Exporto la app para usarla en server.js o index.js
// ===============================
export default app;
