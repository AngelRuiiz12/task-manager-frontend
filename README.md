# Task Manager Frontend

Una aplicación web moderna de gestión de tareas construida con **React 19** y **Vite**. Cliente frontend que se conecta a una API REST backend construida en Node.js.

## 🎯 Características

- ✅ Tareas organizadas por estado (pendiente, en progreso y completada), con las activas destacadas arriba
- ✅ Filtrado de tareas por proyecto, con etiqueta de color por cada uno
- ✅ Creación de tareas mediante ventana modal
- ✅ Dashboard de inicio con estadísticas, progreso general y resumen de actividad
- ✅ Autenticación segura con JWT
- ✅ Rutas protegidas
- ✅ Interfaz responsiva y minimalista con Tailwind CSS, con menú lateral que se adapta a móvil

## 🛠️ Stack Tecnológico

- **React 19** - Librería UI moderna
- **Vite** - Bundler ultra-rápido
- **React Router** - Enrutamiento
- **Tailwind CSS** - Estilos utilitarios
- **lucide-react** - Iconografía minimalista
- **Context API** - Gestión de estado de autenticación

## 📦 Instalación

### Requisitos previos
- Node.js 18+
- npm

### Pasos

```bash
git clone https://github.com/AngelRuiiz12/task-manager-frontend.git
cd task-manager-frontend
npm install
cp .env.example .env
```

Edita `.env` con la URL de la API:

VITE_API_URL=http://localhost:3000


## 🚀 Desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🏗️ Estructura del Proyecto
```bash
src/
├── api/ # Llamadas a la API
│ ├── auth.js
│ ├── tasks.js
│ └── projects.js
├── components/
│ ├── ui/ # Componentes de interfaz reutilizables
│ │ ├── Card.jsx
│ │ ├── Button.jsx
│ │ ├── Input.jsx
│ │ ├── Badge.jsx
│ │ ├── Modal.jsx
│ │ ├── Spinner.jsx
│ │ └── EmptyState.jsx
│ └── ProtectedRoute.jsx
├── context/ # Context API para autenticación
│ └── AuthContext.jsx
├── pages/ # Páginas principales
│ ├── HomePage.jsx
│ ├── LoginPage.jsx
│ ├── RegisterPage.jsx
│ ├── TasksPage.jsx
│ └── ProjectsPage.jsx
├── App.jsx
└── main.jsx
```

## 🔌 API Backend

Este frontend se conecta a la API backend `task-manager-api`:

- **Repositorio**: [AngelRuiiz12/task-manager-api](https://github.com/AngelRuiiz12/task-manager-api)
- **Stack**: Node.js, Express, Prisma, SQLite
- **Base URL**: Configurable en `.env` (default: `http://localhost:3000`)
- **Endpoints principales**:
  - `POST /auth/register` - Registro
  - `POST /auth/login` - Login
  - `GET/POST /tasks` - Gestión de tareas
  - `GET/POST /projects` - Gestión de proyectos

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:3000
```

## 🤝 Autor

**Ángel Ruiz** - Junior Full Stack Developer  
- GitHub: [@AngelRuiiz12](https://github.com/AngelRuiiz12)

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**Nota**: Este proyecto fue desarrollado como parte de mi aprendizaje en desarrollo full stack con React y Node.js.