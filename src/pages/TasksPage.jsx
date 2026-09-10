import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createTask, getTasks } from "../api/tasks";
import { getProjects } from "../api/projects";

function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchData() {
      try {
        const [tasksResult, projectsResult] = await Promise.all([
          getTasks(token),
          getProjects(token),
        ]);
        setTasks(tasksResult.data);
        setProjects(projectsResult.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const newTask = await createTask(token, {
        title,
        projectId: Number(projectId),
      });
      setTasks([...tasks, newTask]);
      setTitle("");
      setProjectId("");
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) {
    return <p className="text-center text-navy p-8">Cargando tareas...</p>;
  }

  if (error) {
    return <p className="text-center text-coral p-8">{error}</p>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-cream">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 max-w-sm mx-auto bg-white rounded-2xl shadow-lg p-6 mt-6 mb-8"
      >
        <h2 className="text-xl font-bold text-navy text-center">Nueva tarea</h2>

        <input
          type="text"
          placeholder="Título de la tarea"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-navy"
        />

        <select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
          required
          className="border border-gray-300 rounded-lg p-2"
        >
          <option value="">Selecciona un proyecto</option>
          {projects.map((project) => (
            <option key={project.id} value={project.id}>
              {project.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-orange text-white font-semibold py-2.5 rounded-lg hover:brightness-90 active:scale-95 hover:cursor-pointer transition"
        >
          Crear tarea
        </button>
      </form>

      {tasks.length === 0 ? (
        <p className="text-center text-navy">
          Todavía no tienes tareas. ¡Crea la primera!
        </p>
      ) : (
        <ul className="max-w-sm mx-auto flex flex-col gap-2">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="bg-white rounded-lg shadow p-3 text-navy-dark"
            >
              {task.title} - {task.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TasksPage;
