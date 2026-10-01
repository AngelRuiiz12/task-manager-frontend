import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { UserPlus } from "lucide-react";
import { register } from "../api/auth";
import { useAuth } from "../context/AuthContext";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login: authLogin } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const data = await register(email, name, password);
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
            <UserPlus className="w-6 h-6 text-accent" />
            <h1 className="text-xl font-semibold text-text">Crear cuenta</h1>
          </div>

          <Input
            id="name"
            label="Nombre"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

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

          <Button type="submit">Crear cuenta</Button>

          <p className="text-sm text-center text-text-muted">
            Ya tengo cuenta.{" "}
            <Link
              to="/login"
              className="text-accent font-medium hover:underline"
            >
              Iniciar sesión
            </Link>
          </p>
        </form>
      </Card>
    </div>
  );
}

export default RegisterPage;
