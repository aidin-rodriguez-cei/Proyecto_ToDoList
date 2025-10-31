# 🧩 Proyecto To-Do List — Full Stack 

Aplicación **Full Stack** desarrollada con **MongoDB, Express, React y Node.js** que permite gestionar tareas personales, con autenticación, panel de usuario, modo oscuro, notificaciones y conexión a base de datos en la nube.

---

## 📝 Descripción general

Este proyecto fue creado como parte del aprendizaje en el módulo **Full Stack (CEI)**.  
Combina un **backend con Express y MongoDB** y un **frontend moderno con React + Vite**, conectados mediante API REST.

El objetivo es ofrecer una interfaz intuitiva y adaptable para crear, editar, completar y eliminar tareas, con persistencia en base de datos y autenticación JWT.

---

## 📁 Estructura del repositorio

```
Proyecto_ToDoList/
│
├── Backend/           # API REST (Express + MongoDB)
│   ├── controllers/   # Lógica separada por recursos (users, tasks)
│   ├── middlewares/   # Autenticación JWT + manejo de errores
│   ├── models/        # Esquemas de Mongoose (User, Task)
│   ├── routes/        # Endpoints del API
│   ├── config.js      # Configuración del servidor
│   ├── index.js       # Punto de entrada del backend
│   └── README.md      # Documentación del backend
│
├── Frontend/          # Interfaz de usuario (React + Vite)
│   ├── public/        # Iconos e imágenes
│   ├── src/
│   │   ├── components/  # Componentes reutilizables (UI)
│   │   ├── context/     # Contextos globales (modo oscuro, tareas, toasts)
│   │   ├── css/         # Archivos de estilos
│   │   ├── hooks/       # Hooks personalizados
│   │   ├── pages/       # Páginas principales (Home, Login, Registro, Cuenta)
│   │   └── routes.jsx   # Configuración de rutas con React Router
│   └── README.md        # Documentación del frontend
│
└── README.md           # Documentación general
```

---

## 🛠️ Tecnologías utilizadas

### Backend
- Node.js + Express  
- MongoDB Atlas + Mongoose  
- JWT (autenticación por token)  
- Bcrypt (encriptación de contraseñas)  
- CORS, Dotenv, Vercel

### Frontend
- React + Vite  
- React Router DOM  
- Context API  
- CSS personalizado  
- Toasts personalizados  
- Modo oscuro persistente  

---

## ⚙️ Funcionalidades principales

### 👤 Usuario
- Registro de usuario con hash de contraseña (Bcrypt)
- Login y autenticación con **JWT**
- Actualización de perfil y cambio de contraseña
- Eliminación de cuenta (borra también sus tareas)

### ✅ Tareas
- Crear, editar, completar y eliminar tareas
- Filtros por prioridad, tipo y estado
- Notificaciones (“toasts”) para acciones
- Guardado automático en base de datos (MongoDB)
- Interfaz responsive con modo claro/oscuro

---

## 💻 Configuración local

### 1. Clona el repositorio
```bash
git clone https://github.com/aidin-rodriguez-cei/Proyecto_ToDoList
cd Proyecto_ToDoList
```

### 2. Configura el **backend**
```bash
cd Backend
npm install
```

Crea un archivo `.env` basado en `.env.example`:
```bash
PORT=5000
DOMAIN="http://localhost"
DB_MOBILE="mongodb+srv://<usuario>:<contraseña>@<cluster>.mongodb.net/<base>"
JWT_SECRET="mi_clave_segura"
```

Inicia el servidor:
```bash
npm run dev
```
Por defecto corre en: **http://localhost:5000**

### 3. Configura el **frontend**
```bash
cd ../Frontend
npm install
```

Crea un archivo `.env`:
```bash
VITE_API_URL=http://localhost:5000/api/v1
```

Ejecuta:
```bash
npm run dev
```
Por defecto se abrirá en: **http://localhost:5173**

---

## 🧪 Prueba rápida

1. Abre el navegador en [http://localhost:5173](http://localhost:5173)
2. Regístrate con un nuevo usuario  
3. Crea tareas, márcalas como completadas o elimínalas  
4. Ve al panel **Cuenta** para actualizar tu nombre o contraseña

---

## 🔗 API REST principal

| Método | Ruta | Descripción |
|--------|------|--------------|
| **POST** | `/api/v1/register` | Crear usuario |
| **POST** | `/api/v1/login` | Iniciar sesión |
| **GET** | `/api/v1/tasks` | Listar tareas del usuario |
| **POST** | `/api/v1/tasks` | Crear tarea |
| **PUT** | `/api/v1/tasks/:id` | Actualizar tarea |
| **DELETE** | `/api/v1/tasks/:id` | Eliminar tarea |
| **GET** | `/api/v1/me` | Obtener perfil |
| **PUT** | `/api/v1/user` | Actualizar nombre o imagen |
| **PUT** | `/api/v1/user/password` | Cambiar contraseña |
| **DELETE** | `/api/v1/user` | Eliminar cuenta |

---

## 🧱 Buenas prácticas aplicadas

- Arquitectura **MVC (Model - View - Controller)**  
- Rutas separadas y limpias  
- Middleware para autenticación y errores  
- Variables de entorno seguras  
- Control de CORS y tokens  
- Código comentado y organizado  

---

## 🚫 Archivos ignorados (.gitignore)

```
node_modules/
dist/
.env
.DS_Store
*.log
```

---

## 👨‍💻 Autor

**Aidin Rodríguez**  
Desarrollado como parte del proceso formativo en **CEI - Full Stack**.  
Inspirado en la búsqueda de una gestión moderna, simple y productiva de tareas.

---

## 📄 Licencia

Proyecto de uso educativo y demostrativo.  

---

**Repositorio:** [https://github.com/aidin-rodriguez-cei/Proyecto_ToDoList](https://github.com/aidin-rodriguez-cei/Proyecto_ToDoList)
