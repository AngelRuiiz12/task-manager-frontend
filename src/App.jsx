import { BrowserRouter, Routes, Route, Link, useParams } from "react-router";

function Home() {
  return <h1 className="text-3xl font-bold p-8">Página de Inicio</h1>;
}

function Login() {
  return <h1 className="text-3xl font-bold p-8">Página de Login</h1>;
}

function UserDetail() {
  const { id } = useParams();
  return <h1 className="text-3xl font-bold p-8">Usuario con id: {id}</h1>;
}

function App() {
  return (
    <BrowserRouter>
      <nav className="flex gap-4 p-4 bg-gray-100">
        <Link to={"/"} className="text-blue-600 hover:underline">
          Inicio
        </Link>
        <Link to={"/login"} className="text-blue-600 hover:underline">
          Login
        </Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/users/:id" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
