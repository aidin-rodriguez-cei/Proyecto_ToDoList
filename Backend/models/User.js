// ==========================
// Modelo de Usuario (User)
// (Define la estructura de los datos de cada usuario en MongoDB)
// ==========================
import mongoose from "mongoose";

// ==========================
// Esquema del usuario
// (Cada campo representa una propiedad del usuario)
// ==========================
const userSchema = new mongoose.Schema(
  {
    // Nombre visible del usuario
    name: {
      type: String,
      required: true,
    },

    // Nombre de usuario único (para login)
    username: {
      type: String,
      required: true,
      unique: true,
    },

    // Contraseña cifrada
    password: {
      type: String,
      required: true,
    },

    // Imagen de perfil (por defecto genera una según el username)
    image: {
      type: String,
      default: function () {
        return `https://picsum.photos/seed/${encodeURIComponent(
          this.username
        )}/200`;
      },
    },
  },
  {
    // Guarda automáticamente la fecha de creación y actualización
    timestamps: true,
  }
);

// ==========================
// Exporto el modelo para poder usarlo en controladores y rutas
// ==========================
const User = mongoose.model("User", userSchema);
export default User;
