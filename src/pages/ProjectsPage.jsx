import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createProject, getProjects } from "../api/projects";

function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [projects, setProjects] = useState([]);
  const [name, setName] = useState("");
  const { token } = useAuth();

  useEffect(() => {
    async function fetchProjects() {
      try {
        const result = await getProjects(token);
        setProjects(result.data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newProject = await createProject(token, name);
      setProjects([...projects, newProject]);
    } catch (err) {
      setError(err.message);
      console.error(err.message);
    }
  }

  if (loading) {
    return <p className="text-center text-navy p-8">Cargando proyectos...</p>;
  }

  if (error) {
    return <p className="text-center text-coral p-8">{error}</p>;
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center bg-cream gap-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-full max-w-sm gap-5 bg-white rounded-2xl shadow-lg p-8"
      >
        <h1 className="text-2xl font-bold text-center text-navy">
          Nuevo Proyecto
        </h1>

        <div className="flex flex-col gap-1">
          <label htmlFor="name" className="text-sm font-medium text-gray-600">
            Nombre
          </label>
          <input
            id="name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-navy"
          />
        </div>

        {error && <p className="text-coral text-sm text-center">{error}</p>}

        <button
          type="submit"
          className="bg-orange text-white font-semibold py-2.5 rounded-lg hover:brightness-90 active:scale-95 hover:cursor-pointer transition"
        >
          Crear proyecto
        </button>
      </form>
      {projects.length === 0 ? (
        <p className="text-center text-navy">Todavía no tienes proyectos</p>
      ) : (
        <>
          <h2 className="text-xl font-bold text-navy-dark text-center underline">
            Proyectos:
          </h2>
          <ul>
            {projects.map((project) => (
              <li
                key={project.id}
                className="font-medium text-navy-dark text-center"
              >
                {project.name}
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default ProjectsPage;
