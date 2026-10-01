import { useEffect, useState } from "react";
import { Plus, Trash2, CheckCircle2, Circle, ListTodo } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { createTask, getTasks, updateTask, deleteTask } from "../api/tasks";
import { getProjects } from "../api/projects";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Badge from "../components/ui/Badge";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

const STATUS_LABELS = {
  PENDING: "Pendiente",
  IN_PROGRESS: "En progreso",
  DONE: "Completada",
};

const STATUS_VARIANTS = {
  PENDING: "warning",
  IN_PROGRESS: "default",
  DONE: "success",
};

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

  async function handleToggleStatus(task) {
    const newStatus = task.status === "DONE" ? "PENDING" : "DONE";

    try {
      const updated = await updateTask(token, task.id, { status: newStatus });
      setTasks(tasks.map((t) => (t.id === task.id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      await deleteTask(token, id);
      setTasks(tasks.filter((t) => t.id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  if (loading) return <Spinner />;

  if (error) {
    return <p className="text-center text-danger p-8">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 flex flex-col gap-8">
      <Card>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-text">Nueva tarea</h2>

          <Input
            placeholder="Título de la tarea"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <select
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            required
            className="border border-border rounded-lg p-2 text-text focus:outline-none focus:ring-2 focus:ring-accent"
          >
            <option value="">Selecciona un proyecto</option>
            {projects.map((project) => (
              <option key={project.id} value={project.id}>
                {project.name}
              </option>
            ))}
          </select>

          <Button
            type="submit"
            className="self-start flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Crear tarea
          </Button>
        </form>
      </Card>

      {tasks.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="Todavía no tienes tareas"
          description="Crea la primera con el formulario de arriba"
        />
      ) : (
        <div className="flex flex-col gap-3">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="flex items-center justify-between gap-4 p-4"
            >
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleToggleStatus(task)}
                  className="text-text-muted hover:text-success cursor-pointer"
                  title={
                    task.status === "DONE"
                      ? "Marcar como pendiente"
                      : "Marcar como completada"
                  }
                >
                  {task.status === "DONE" ? (
                    <CheckCircle2 className="w-5 h-5 text-success" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <span
                  className={`text-text ${
                    task.status === "DONE" ? "line-through text-text-muted" : ""
                  }`}
                >
                  {task.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Badge variant={STATUS_VARIANTS[task.status]}>
                  {STATUS_LABELS[task.status]}
                </Badge>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="text-text-muted hover:text-danger cursor-pointer"
                  title="Eliminar tarea"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default TasksPage;
