import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await login(email, password);
      authLogin(data.user, data.token);
      navigate("/tasks");
      console.log(data);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  }

  return (
    <div className="flex h-screen justify-center items-center bg-cream">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm gap-5 bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-center text-navy">
          Iniciar Sesión
        </h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-600"
          >
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>

        {error && <p className="text-coral text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-orange text-white font-semibold py-2.5 rounded-lg hover:brightness-90 active:scale-95 hover:cursor-pointer transition"
        >
          Login
        </button>

        <p className="text-xs italic text-center mt-2 text-navy">
          ¿No tienes cuenta?{" "}
          <span className="text-navy-dark font-semibold hover:cursor-pointer hover:underline hover:underline-offset-2">
            <Link to={"/register"}>Regístrate</Link>
          </span>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
