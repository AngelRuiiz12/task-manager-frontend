import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router";
import {
  Home as HomeIcon,
  ListTodo,
  FolderKanban,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TasksPage from "./pages/TasksPage";
import ProjectsPage from "./pages/ProjectsPage";
import HomePage from "./pages/HomePage";
import { useAuth } from "./context/AuthContext";

function Layout() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  function closeSidebar() {
    setIsSidebarOpen(false);
  }

  function handleLogout() {
    logout();
    navigate("/login");
    closeSidebar();
  }

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-accent text-white" : "text-text-muted hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen">
      {/* Barra superior: solo visible en móvil */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-14 bg-surface border-b border-border flex items-center justify-between px-4 z-30">
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="text-text cursor-pointer"
        >
          <Menu className="w-6 h-6" />
        </button>
        <p className="font-bold text-text">Task Manager</p>
        <div className="w-6" />
      </div>

      {/* Fondo oscuro detrás del menú, solo en móvil y con el menú abierto */}
      {isSidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/40 z-40"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar: drawer deslizante en móvil, fija en pantallas md+ */}
      <aside
        className={`w-56 shrink-0 h-screen top-0 left-0 overflow-y-auto bg-surface border-r border-border flex flex-col p-4 fixed z-50 transition-transform duration-200 md:sticky md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between md:justify-center mb-6">
          <p className="text-lg font-bold text-text">Task Manager</p>
          <button
            onClick={closeSidebar}
            className="md:hidden text-text-muted cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          <NavLink to="/" className={linkClasses} end onClick={closeSidebar}>
            <HomeIcon className="w-4 h-4" />
            Inicio
          </NavLink>

          {token && (
            <>
              <NavLink
                to="/tasks"
                className={linkClasses}
                onClick={closeSidebar}
              >
                <ListTodo className="w-4 h-4" />
                Tareas
              </NavLink>
              <NavLink
                to="/projects"
                className={linkClasses}
                onClick={closeSidebar}
              >
                <FolderKanban className="w-4 h-4" />
                Proyectos
              </NavLink>
            </>
          )}
        </nav>

        <div className="mt-auto flex flex-col gap-2">
          {token ? (
            <>
              <p className="text-xs text-text-muted px-3 truncate">
                {user?.email}
              </p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium text-text-muted hover:bg-gray-100 transition cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Cerrar sesión
              </button>
            </>
          ) : (
            <NavLink to="/login" className={linkClasses} onClick={closeSidebar}>
              Login
            </NavLink>
          )}
        </div>
      </aside>

      <main className="flex-1 pt-14 md:pt-0">
        <Outlet />
      </main>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
          </Route>
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
