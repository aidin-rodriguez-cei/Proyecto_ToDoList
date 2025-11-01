// ==========================
// Middleware para manejar errores globales
// (Captura cualquier error que ocurra en las rutas o middlewares
//  y devuelve una respuesta clara y consistente al cliente)
// ==========================
export const errorHandler = (err, req, res, _next) => {
  console.error("Error capturado por middleware:", err); // para ver el error en consola

  // ==========================
  // 1) Determino el código de estado (por defecto 500 si no hay otro)
  // ==========================
  const status = err.status || 500;

  // ==========================
  // 2) Elijo el mensaje según el tipo de error
  // ==========================
  const message =
    status === 404
      ? "Ruta no encontrada"
      : status === 500
      ? "Error interno del servidor"
      : err.message || "Ocurrió un error inesperado";

  // ==========================
  // 3) Devuelvo una respuesta uniforme para todos los errores
  // (Incluye info básica y el stack solo en modo desarrollo)
  // ==========================
  res.status(status).json({
    ok: false,
    status,
    message,
    method: req.method, 
    path: req.originalUrl, 
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};
