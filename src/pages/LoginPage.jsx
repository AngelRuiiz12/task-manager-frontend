import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { LogIn } from "lucide-react";
import { login } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

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
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="flex justify-center items-center px-4 py-16">
      <Card className="w-full max-w-sm">
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="flex flex-col items-center gap-2">
            <LogIn className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-semibold text-text">Iniciar sesión</h1>
          </div>

          <Input
            id="email"
            label="Email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            id="password"
            label="Contraseña"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && <p className="text-danger text-sm text-center">{error}</p>}

          <Button type="submit">Iniciar sesión</Button>

          <p className="text-sm text-center text-text-muted">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-accent font-medium hover:underline"
            >
              Regístrate
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default LoginPage;
