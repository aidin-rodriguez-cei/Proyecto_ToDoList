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
  // Conecto a la base de datos antes de procesar la petición
  await connectToDatabase();
  
  // Delego la petición a Express
  return app(req, res);
}