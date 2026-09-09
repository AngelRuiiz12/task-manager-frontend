import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  Outlet,
} from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

function Home() {
  return <h1 className="text-3xl font-bold p-8">Página de Inicio</h1>;
}

function UserDetail() {
  const { id } = useParams();
  return <h1 className="text-3xl font-bold p-8">Usuario con id: {id}</h1>;
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
          <Route path="/users/:id" element={<UserDetail />} />
          <Route path="/tasks" element={<Home />} />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
