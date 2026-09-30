# Task Manager Frontend

Una aplicación web moderna de gestión de tareas construida con **React 19** y **Vite**. Cliente frontend profesional que se conecta a una API REST backend robusta.

## 🎯 Características

- ✅ Gestión completa de tareas (crear, editar, eliminar, completar)
- ✅ Autenticación segura con tokens JWT
- ✅ Organización por categorías
- ✅ Interfaz responsiva y moderna con Tailwind CSS
- ✅ Validación en tiempo real
- ✅ Manejo robusto de errores
- ✅ Integration completa con API backend

## 🛠️ Stack Tecnológico

- **React 19** - Librería UI moderna
- **Vite** - Bundler ultra-rápido
- **Tailwind CSS** - Estilos utilitarios
- **Context API** - Gestión de estado
- **Axios** - Cliente HTTP

## 📦 Instalación

### Requisitos previos
- Node.js 18+
- npm o yarn

### Pasos

```bash
# Clonar el repositorio
git clone https://github.com/AngelRuiiz12/task-manager-frontend.git
cd task-manager-frontend

# Instalar dependencias
npm install

# Crear archivo .env (copiar de .env.example)
cp .env.example .env

# Editar .env con la URL de tu API
# VITE_API_URL=http://localhost:8000
```

## 🚀 Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# La aplicación estará disponible en http://localhost:5173
```

## 🏗️ Estructura del Proyecto
```bash
src/
├── components/ # Componentes reutilizables
│ ├── TaskList.jsx
│ ├── TaskForm.jsx
│ └── ProtectedRoute.jsx
├── context/ # Context API para estado global
│ └── AuthContext.jsx
├── pages/ # Páginas principales
│ ├── LoginPage.jsx
│ ├── RegisterPage.jsx
│ └── DashboardPage.jsx
├── services/ # Servicios API
│ ├── authService.js
│ └── taskService.js
├── App.jsx
└── main.jsx
```

## 🔌 API Backend

Este frontend se conecta a la API backend `expense-tracker-api`:

- **Repositorio**: [AngelRuiiz12/expense-tracker-api](https://github.com/AngelRuiiz12/expense-tracker-api)
- **Base URL**: Configurable en `.env` (default: `http://localhost:8000`)
- **Endpoints principales**:
  - `POST /api/v1/auth/register` - Registro
  - `POST /api/v1/auth/login` - Login
  - `GET/POST /api/v1/tasks` - Gestión de tareas

## 🔐 Variables de Entorno

Crea un archivo `.env` basado en `.env.example`:

```env
VITE_API_URL=http://localhost:8000
```

## 📝 Ejemplo de Uso

1. **Registro**: Crea una cuenta nueva
2. **Login**: Autentícate con tus credenciales
3. **Crear tareas**: Usa el formulario para añadir nuevas tareas
4. **Organizar**: Agrupa por categorías
5. **Completar**: Marca tareas como completadas

## 🧪 Testing

```bash
# Ejecutar tests
npm run test
```

## 📦 Build para Producción

```bash
# Crear build optimizado
npm run build

# Previsualizar build
npm run preview
```

## 🤝 Autor

**Ángel Ruiz** - Junior Backend Developer
- GitHub: [@AngelRuiiz12](https://github.com/AngelRuiiz12)
- Portfolio: [expense-tracker-api](https://github.com/AngelRuiiz12/expense-tracker-api)

## 📄 Licencia

Este proyecto está bajo la licencia MIT.

---

**Nota**: Este proyecto fue desarrollado como parte de mi aprendizaje en desarrollo full stack con React y Node.js.