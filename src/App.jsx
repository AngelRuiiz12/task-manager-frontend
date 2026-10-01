import {
  BrowserRouter,
  Routes,
  Route,
  NavLink,
  Outlet,
  useNavigate,
} from "react-router";
import { Home as HomeIcon, ListTodo, FolderKanban, LogOut } from "lucide-react";
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

  function handleLogout() {
    logout();
    navigate("/login");
  }

  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition ${
      isActive ? "bg-accent text-white" : "text-text-muted hover:bg-gray-100"
    }`;

  return (
    <div className="flex min-h-screen">
      <aside className="w-56 shrink-0 bg-surface border-r border-border flex flex-col p-4">
        <p className="text-lg font-bold text-text text-center mb-6">
          Task Manager
        </p>

        <nav className="flex flex-col gap-1">
          <NavLink to="/" className={linkClasses} end>
            <HomeIcon className="w-4 h-4" />
            Inicio
          </NavLink>

          {token && (
            <>
              <NavLink to="/tasks" className={linkClasses}>
                <ListTodo className="w-4 h-4" />
                Tareas
              </NavLink>
              <NavLink to="/projects" className={linkClasses}>
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
            <NavLink to="/login" className={linkClasses}>
              Login
            </NavLink>
          )}
        </div>
      </aside>

      <main className="flex-1">
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
