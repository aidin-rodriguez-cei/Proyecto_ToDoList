// ===============================
// Importo los módulos necesarios
// ===============================
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";

import apiRouter from "./routes/index.js"; // Rutas principales de la API
import { errorHandler } from "./middlewares/errorHandler.js"; // Middleware de manejo de errores

const app = express();

// ===============================
// Seguridad y registro de peticiones
// ===============================
app.use(helmet());
if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// ===============================
// CORS (frontend local y dominio de Vercel)
// ===============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "https://proyecto-to-do-list-go.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Permite peticiones sin origin 
      if (!origin) return callback(null, true);
      
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'El origen CORS no está permitido.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.options("*", cors());

// ===============================
// Body parsers
// ===============================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===============================
// Compresión (gzip/br)
// ===============================
app.use(compression());

// ===============================
// Ruta raíz - Bienvenida a la API
// ===============================
app.get("/", (_req, res) => {
  res.json({
    message: "🚀 API To-Do List",
    version: "1.0.0",
    status: "running",
    endpoints: {
      health: "/api/v1/health",
      api: "/api/v1"
    }
  });
});

// ===============================
// Endpoint de salud (para probar el deploy)
// ===============================
app.get("/api/v1/health", (_req, res) => {
  res.json({ 
    ok: true,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// ===============================
// Rutas de API versionadas
// ===============================
app.use("/api/v1", apiRouter);

// ===============================
// 404 → pasa por errorHandler
// ===============================
app.use((req, _res, next) => {
  const error = new Error(`Ruta no encontrada: ${req.originalUrl}`);
  error.status = 404;
  next(error);
});

// ===============================
// Manejo global de errores
// ===============================
app.use(errorHandler);

export default app;