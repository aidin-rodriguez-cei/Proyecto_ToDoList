# 📝 To do List — Front-End

Aplicación web desarrollada con **React + Vite** que permite gestionar tareas personales con autenticación, modo claro/oscuro y persistencia de datos.  

---

## 🌟 ¿Qué encontrarás aquí?

Este repositorio contiene el **front-end** del proyecto **To do List**, que incluye:

- Interfaz de usuario responsive desarrollada en **React (Vite)**.  
- Gestión de tareas (crear, editar, eliminar, filtrar).  
- Sistema de autenticación (login y registro).  
- Modo claro/oscuro.  
- Notificaciones para mejorar la experiencia del usuario.  

---

## 🧰 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- **Node.js** versión 18 o superior  
- **npm** versión 9 o superior  
- El **backend** en ejecución (Express) para poder conectar con la API

Verifica las versiones ejecutando:

```bash
node -v
npm -v
```

---

## ⚙️ Instalación y configuración local

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
   (Este archivo define la dirección del backend que usará el front-end)

   ```bash
   # .env
   VITE_API_URL=http://localhost:5000/api/v1
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   ```

   Por defecto se abrirá en:  
   👉 http://localhost:5173

5. **Asegúrate de que el backend esté corriendo**  
   Puedes probarlo visitando en el navegador:  
   `http://localhost:5000/api/v1/health`  
   Debería devolver algo como `{ ok: true }`

---

## 🧪 Scripts disponibles

| Comando | Descripción |
|----------|--------------|
| `npm run dev` | Inicia el entorno de desarrollo |
| `npm run build` | Genera la versión de producción en `/dist` |
| `npm run preview` | Previsualiza la versión compilada localmente |
| `npm run lint` | Analiza el código con ESLint (si está configurado) |

---

## 📁 Estructura principal del proyecto
La estructura está organizada para mantener el código modular, limpio y fácil de mantener:

```
src/
├── assets/                 # Recursos estáticos (íconos, imágenes, SVG)
│   ├── icons.js
│   └── react.svg
│
├── components/             # Componentes reutilizables de la interfaz
│   ├── Filters.jsx         # Filtros para las tareas
│   ├── Footer.jsx          # Pie de página (botón + info)
│   ├── Header.jsx          # Encabezado con menú y modo oscuro
│   ├── TaskForm.jsx        # Formulario para crear o editar tareas
│   ├── TaskItem.jsx        # Elemento individual de tarea
│   └── TaskList.jsx        # Lista completa de tareas
│
├── context/                # Contextos globales (React Context API)
│   ├── ModoOscuroContext.jsx  # Control del modo claro/oscuro
│   ├── TasksContext.jsx       # Manejo de las tareas y sincronización con localStorage
│   └── ToastContext.jsx       # Notificaciones tipo “toast”
│
├── css/                    # Archivos de estilos del proyecto
│   ├── App.css
│   ├── index.css
│   └── style.css
│
├── hooks/                  # Hooks personalizados
│   ├── useTasks.js         # Lógica para manejo de tareas
│   └── useUser.jsx         # Manejo del usuario y autenticación
│
├── lib/                    # Constantes o funciones auxiliares
│   └── constants.js
│
├── pages/                  # Páginas principales del sitio
│   ├── Home.jsx            # Página principal (inicio o vista de tareas)
│   ├── Login.jsx           # Página de inicio de sesión
│   ├── Registro.jsx        # Página de registro
│   ├── App.jsx             # Enrutador principal de la app
│   ├── auth.js             # Utilidades para verificación de sesión
│   ├── error-page.jsx      # Página de error
│   ├── main.jsx            # Punto de entrada del proyecto
│   └── routes.jsx          # Configuración de rutas
│
└── index.html              # HTML base (Vite)

```

---

## 🔐 Autenticación y sesión

El sistema utiliza `localStorage` para guardar los datos del usuario y token JWT:

- `user` → Datos del usuario actual  
- `token` → Token de autenticación  
- `TASKS:<username>` → Lista de tareas asociadas al usuario

Para cerrar sesión manualmente (por depuración):
```js
localStorage.clear();
window.dispatchEvent(new Event("auth-changed"));
```

---

## 🧭 Rutas principales

| Ruta | Descripción |
|------|--------------|
| `/` | Página de inicio (pública o privada según sesión) |
| `/login` | Formulario de inicio de sesión |
| `/registro` | Formulario de registro |
| `/tareas` | Vista principal con la lista de tareas (requiere sesión) |

---

## 🎨 Modo claro / oscuro

El estado del tema se guarda automáticamente en `localStorage` y se conserva entre recargas.  
Puedes cambiarlo desde el botón 🌙 / ☀️ del encabezado.

---

## 🧹 Archivos ignorados (.gitignore)

Para mantener el repositorio limpio y seguro, **no subas**:

```
node_modules/
dist/
.env
.DS_Store
*.log
```

---

## 💡 Autoría y créditos

Proyecto desarrollado por **Aidin Rodríguez**  
Como parte del proceso de formación del CEI módulo Full Stack.  
Inspirado en la búsqueda de una gestión simple y moderna de tareas personales.

---
