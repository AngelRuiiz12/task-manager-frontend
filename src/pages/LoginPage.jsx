import { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    console.log({ email, password });
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

        <button
          type="submit"
          className="bg-orange text-white font-semibold py-2.5 rounded-lg hover:brightness-90 active:scale-95 hover:cursor-pointer transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
