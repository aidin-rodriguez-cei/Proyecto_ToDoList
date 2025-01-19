import express from "express";

// Hash y JWT
import bcrypt from "bcrypt"; // es para hacer hash de nuestro passwords
import jwt from "jsonwebtoken"; // crear y leer tokens JWT

// middlewares
import cors from "cors";

// configuraciones
import { PORT, DOMAIN, JWT_SECRET, __dirname } from "./config.js";

// elementos de Auth
import { authenticateToken } from './middlewares/auth.js';

// Utilities
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simulando la Base de datos
const users = [];

const MockUsers = {
  name: "Aidin",
  username: "aidin@mail.com",
  password: "1234",
  image: "https://picsum.photos/200",
};

// Rutas

// USUARIOS

app.get("/api/v1/users", async (req, res, next) => {
  res.status(200).json({ data: users, message: "Aquí estan tus usuarios" });
});

//POST Login de Usuarios

app.post("/api/v1/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // obtener el usuario recién creado
    const user = users.find((u) => u.username === username);

    if (!user) {
      return res.status(400).json({ message: "usuario no existente" });
    }

    // comprar la contraseña de la base de datos, con la contraseña del login
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Clave incorrecta" });
    }

    console.log("User encontrado: ", user);

    // Crear JWT Token y devuelvo el usuario

    // Create and Sign a New Token
    const token = jwt.sign({ username: username }, JWT_SECRET, {
      expiresIn: "1h",
    });

    console.log("haciendo login");
    res.status(200).json({ data: user, message: "Login exitoso", token});
  } catch (e) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});

//POST Registro de Usuarios

app.post("/api/v1/register", async (req, res, next) => {
  const {
    name,
    username,
    password,
    image = "https://picsum.photos/200",
  } = req.body;

  console.log(req.body);
  console.log(image);

  // Hash de contraseña con Bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Guardar esto en la DB
  const id = Math.floor(Math.random() * 10000) + 1;
  const newUser = { id, username, password: hashedPassword, name, image };
  users.push(newUser);

  // obtener el usuario recién creado
  const user = users.find((u) => u.username === username);

    // Crear JWT Token y devuelvo el usuario (sin clave)

    // Create and Sign JWT
    const token = jwt.sign({ username: username }, JWT_SECRET, {
      expiresIn: "1h",
    });


  try {
    console.log("haciendo register");
    res.status(200).json({ data: user, message: "Usuario registrado con éxito", token });
  } catch (e) {
    res.status(500).json({ error: "Error en el servidor" });
  }
});


// HOME PRIVADO

//app.get('/api/v1/home', authenticateToken, async (req, res, next) => {
//  console.log("ver contenido de la página");
//  res.status(200).json({ message: "Aquí estan tu contenido del home" })
//});

app.listen(PORT, () => {
  console.log(`Server esta corriendo en ${DOMAIN}:${PORT}`);
});
