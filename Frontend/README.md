# 📝 To do List — Front-End

Aplicación web desarrollada con **React + Vite** que permite gestionar tareas personales con autenticación, modo claro/oscuro, conexión al backend (**Express + MongoDB**) y persistencia de datos.

---

## 🚀 ¿Qué encontrarás aquí?

Este repositorio contiene el **front-end** del proyecto **To do List**, que incluye:

- Interfaz moderna y responsive desarrollada en **React (Vite)**  
- Gestión completa de tareas: crear, editar, eliminar, filtrar y marcar como completadas  
- Sistema de autenticación con **JWT** conectado al backend  
- **Modo claro/oscuro** persistente mediante Context API  
- Notificaciones globales con `ToastContext`  
- Estructura limpia, modular y escalable  

---

## ⚙️ Requisitos previos

Asegúrate de tener instalado:

- **Node.js** v18 o superior  
- **npm** v9 o superior  
- **Backend** funcionando (por defecto en el puerto 5000)

Verifica tus versiones con:

```bash
node -v
npm -v
```

---

## 🧩 Instalación y configuración local

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/aidin-rodriguez-cei/Proyecto_ToDoList
   cd todolist-frontend
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   ```

3. **Crea un archivo `.env` en la raíz del proyecto**

   ```bash
   # .env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

   > Asegúrate de que esta URL coincida con la del backend.

4. **Inicia el servidor de desarrollo**

   ```bash
   npm run dev
   ```

   Se abrirá en:  
   [http://localhost:5173](http://localhost:5173)

5. **Verifica la conexión con el backend**

   En el navegador visita:  
   [http://localhost:5000/api/v1/health](http://localhost:5000/api/v1/health)  
   Si devuelve `{ ok: true }`, todo está funcionando correctamente.

---

## 📜 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia el entorno de desarrollo |
| `npm run build` | Genera la versión de producción en `/dist` |
| `npm run preview` | Previsualiza la versión compilada |
| `npm run lint` | Ejecuta ESLint (si está configurado) |

---

## 🧱 Estructura del proyecto

```
Frontend/
├── public/
│   └── icons/                 # Íconos e imágenes públicas
│
├── src/
│   ├── assets/
│   │   └── icons.js
│   │
│   ├── components/            # Componentes reutilizables
│   │   ├── CustomSelect.jsx
│   │   ├── Filters.jsx
│   │   ├── Footer.jsx
│   │   ├── Header.jsx
│   │   ├── PriorityDropdown.jsx
│   │   ├── PrioritySelect.jsx
│   │   ├── TaskCheckbox.css
│   │   ├── TaskCheckbox.jsx
│   │   ├── TaskForm.jsx
│   │   ├── TaskItem.jsx
│   │   └── TaskList.jsx
│   │
│   ├── context/               # Estados globales (Context API)
│   │   ├── ModoOscuroContext.jsx
│   │   ├── TasksContext.jsx
│   │   └── ToastContext.jsx
│   │
│   ├── css/                   # Estilos globales
│   │   ├── filters.css
│   │   ├── index.css
│   │   ├── priority-radios.css
│   │   └── style.css
│   │
│   ├── hooks/
│   │   ├── useTasks.js
│   │   └── useUser.jsx
│   │
│   ├── lib/
│   │   └── constants.js
│   │
│   ├── pages/                 # Páginas de la aplicación
│   │   ├── Cuenta.jsx
│   │   ├── Home.jsx
│   │   ├── Login.jsx
│   │   └── Registro.jsx
│   │
│   ├── App.jsx                # Componente raíz
│   ├── auth.js                # Funciones de autenticación
│   ├── error-page.jsx         # Página de error 404
│   ├── main.jsx               # Entry point
│   └── routes.jsx             # Configuración de rutas
│
├── .env.example               # Ejemplo de configuración
└── index.html
```

---

## 🔐 Autenticación y sesión

El front-end se comunica con el backend mediante **JWT**.  
Los datos se almacenan en `localStorage`:

| Clave | Descripción |
|-------|--------------|
| `user` | Datos del usuario autenticado |
| `token` | Token JWT |
| `TASKS_<username>` | Tareas asociadas al usuario |

Para cerrar sesión manualmente:

```js
localStorage.clear();
window.dispatchEvent(new Event("auth-changed"));
```

---

## 🧭 Rutas principales

| Ruta | Descripción |
|------|--------------|
| `/` | Página principal (lista de tareas, requiere login) |
| `/login` | Formulario de inicio de sesión |
| `/registro` | Formulario de registro |
| `/cuenta` | Panel del usuario (perfil y contraseña) |
| `*` | Página de error (ErrorPage) |

---

## 🌗 Modo claro / oscuro

- Controlado mediante el contexto `ModoOscuroContext`  
- Persistente entre sesiones con `localStorage`  
- Activable desde el botón ☀️ / 🌙 del encabezado (`Header`)

---

## 🔔 Notificaciones (Toasts)

Sistema de mensajes rápidos implementado con `ToastContext`.

Ejemplo de uso:

```js
toast.success("¡Tarea creada!");
toast.error("No se pudo eliminar la tarea");
```

---

## 🎨 Estilos

El proyecto usa **CSS modularizado** para separar responsabilidades:

| Archivo | Descripción |
|----------|-------------|
| `style.css` | Estilos globales base (tipografía, colores, layout) |
| `index.css` | Estilos principales de la app |
| `filters.css` | Filtros y selectores |
| `priority-radios.css` | Estilos de prioridades |

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

## 👤 Autoría y créditos

Desarrollado por **Aidin Rodríguez**  
Proyecto académico **CEI — Módulo Full Stack**

---
