import { BrowserRouter, Routes, Route, Link, Outlet } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
import TasksPage from "./pages/TasksPage";
import ProjectsPage from "./pages/ProjectsPage";

function Home() {
  return <h1 className="text-3xl font-bold p-8">Página de Inicio</h1>;
}

function Layout() {
  return (
    <>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to={"/"} className="text-blue-600 hover:underline">
          Inicio
        </Link>
        <Link to={"/login"} className="text-blue-600 hover:underline">
          Login
        </Link>
      </nav>

      <Outlet />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
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
