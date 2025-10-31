# 🗂️ Back-End — To-Do List (Express + MongoDB)

API REST creada para gestionar usuarios y tareas de la aplicación **To-Do List**.  
Stack: **Node.js + Express + MongoDB (Mongoose) + JWT + CORS**.

> Este backend expone endpoints versionados bajo `/api/v1` y está preparado para funcionar junto con el frontend en Vite (`http://localhost:5173`).

---

## 🚀 Requisitos

- **Node.js** ≥ 18  
- **npm** ≥ 9  
- **MongoDB** (local o Atlas)  
- Archivo **.env** configurado (ver ejemplo más abajo)

---

## ⚙️ Variables de entorno

Crea un archivo `.env` dentro de la carpeta **Backend/** con el siguiente contenido:

```env
# Puerto y dominio local
PORT=5000
DOMAIN=http://localhost

# Clave secreta JWT
JWT_SECRET=super_clave_ultra_secreta

# Conexión a MongoDB
# Ejemplo local:
DB_MOBILE=mongodb://127.0.0.1:27017/to-do-list
# Ejemplo Atlas:
# DB_MOBILE=mongodb+srv://<usuario>:<password>@<cluster>/<db>?retryWrites=true&w=majority
```

> 💡 Recuerda **no subir** este archivo al repositorio (ya está incluido en `.gitignore`).

---

## 🛠️ Instalación

```bash
# Desde la carpeta Backend/
npm install
```

---

## 🧩 Comandos útiles

```bash
# Modo desarrollo (con nodemon si está en package.json)
npm run dev

# Modo producción
npm start
```

Por defecto, el servidor se levanta en:  
👉 **http://localhost:5000**

---

## 🗂️ Estructura de carpetas

```
Backend/
├── controllers/
│   ├── task.controller.js
│   └── user.controller.js
├── middlewares/
│   ├── auth.js
│   └── errorHandler.js
├── models/
│   ├── Task.js
│   └── User.js
├── routes/
│   ├── index.js
│   ├── tasks.routes.js
│   └── users.routes.js
├── .env.example
├── config.js
├── index.js    
├── app.js           
└── README.md
```

---

## 🌐 CORS

Configurado por defecto para permitir el acceso desde el frontend local:  
**http://localhost:5173**

> Si despliegas en producción, recuerda añadir tu dominio al array `origin` dentro de `app.js`.

---

## 📡 Endpoints principales

### 🔐 Autenticación / Usuarios

| Método | Endpoint | Descripción |
|:-------|:----------|:-------------|
| **POST** | `/api/v1/register` | Registro de usuario |
| **POST** | `/api/v1/login` | Inicio de sesión |
| **GET** | `/api/v1/me` | Perfil actual |
| **PUT** | `/api/v1/user` | Actualizar perfil |
| **PUT** | `/api/v1/user/password` | Cambiar contraseña |
| **DELETE** | `/api/v1/user` | Eliminar cuenta |

### ✅ Tareas

| Método | Endpoint | Descripción |
|:-------|:----------|:-------------|
| **GET** | `/api/v1/tasks` | Listar tareas |
| **POST** | `/api/v1/tasks` | Crear tarea |
| **PUT** | `/api/v1/tasks/:taskId` | Editar tarea |
| **DELETE** | `/api/v1/tasks/:taskId` | Eliminar tarea |

### 🩺 Salud del servidor

| Método | Endpoint | Descripción |
|:-------|:----------|:-------------|
| **GET** | `/api/v1/health` | Verifica que el servidor esté funcionando |

---

## ⚠️ Manejo de errores

El backend utiliza un **middleware global** (`middlewares/errorHandler.js`) que captura, formatea y responde los errores de forma consistente.

---

## 🔗 Integración con el Frontend

En el frontend (Vite), crea un archivo `.env` con la siguiente variable:

```env
VITE_API_URL=http://localhost:5000/api/v1
```

---

## 🧩 Troubleshooting

- Verifica la variable `DB_MOBILE` si la conexión con MongoDB falla.  
- Asegúrate de agregar tu dominio en la configuración de CORS al desplegar.  
- Si recibes un error **401 o 403**, revisa que el **token JWT** sea válido y no haya expirado.  

---

## ✍️ Autoría

Desarrollado por **Aidin Rodríguez**  
Proyecto académico — CEI | Módulo Full Stack  

---

