// ==========================
// Middleware de autenticación con JWT
// (Verifico el token que viene en el header y, si es válido,
//  guardo el usuario en req.user para usarlo en las rutas protegidas)
// ==========================
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

export const authenticateToken = (req, res, next) => {
  // ==========================
  // 1) Tomo el token del header Authorization: "Bearer <token>"
  // (Si no viene, corto con 401 porque la ruta requiere autenticación)
  // ==========================
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Sin token -> 401 (no autorizado)
  if (!token) {
    return res.status(401).json({ message: "Token requerido" });
  }

  // ==========================
  // 2) Verifico el token con mi clave secreta
  // (Si está vencido o es inválido, respondo 403; si está bien, sigo)
  // ==========================
  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("Token inválido:", err.message);
      return res.status(403).json({ message: "Token inválido o expirado" });
    }

    // ==========================
    // 3) Guardo datos útiles del usuario en req.user
    // (Acá solo necesito el username para buscar info del usuario luego)
    // ==========================
    req.user = { username: payload.username };

    // ==========================
    // 4) Continúo con la siguiente función/ruta
    // ==========================
    next();
  });
};
