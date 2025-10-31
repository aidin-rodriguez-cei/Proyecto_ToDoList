// ===============================
// Entrada serverless para Vercel
// ===============================
import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "../app.js";

// Cargo las variables de entorno
dotenv.config();

// ===============================
// Conexión a MongoDB (con caché para evitar múltiples conexiones)
// ===============================
let cachedDb = null;

async function connectToDatabase() {
  if (cachedDb) {
    console.log("✅ Usando conexión existente a MongoDB");
    return cachedDb;
  }

  try {
    const db = await mongoose.connect(process.env.DB_MOBILE, {
      serverSelectionTimeoutMS: 5000,
    });
    cachedDb = db;
    console.log("✅ Nueva conexión a MongoDB - Database: to-do-list");
    return db;
  } catch (err) {
    console.error("❌ Error conectando a MongoDB:", err);
    throw err;
  }
}

// ===============================
// Handler de Vercel
// ===============================
export default async function handler(req, res) {
  // IMPORTANTE: Headers CORS para Vercel
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://proyecto-to-do-list-go.vercel.app",
  ];
  
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Manejo de preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Conecto a la base de datos antes de procesar la petición
  try {
    await connectToDatabase();
  } catch (error) {
    return res.status(500).json({ error: "Error de conexión a la base de datos" });
  }
  
  // Delego la petición a Express
  return app(req, res);
}