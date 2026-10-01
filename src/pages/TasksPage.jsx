import { useEffect, useState } from "react";
import {
  Plus,
  Trash2,
  Circle,
  Clock,
  CheckCircle2,
  ListTodo,
  X,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { createTask, getTasks, updateTask, deleteTask } from "../api/tasks";
import { getProjects } from "../api/projects";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

const STATUS_ORDER = ["PENDING", "IN_PROGRESS", "DONE"];

const ACTIVE_COLUMNS = [
  { key: "PENDING", label: "Pendiente", dotClass: "bg-warning" },
  { key: "IN_PROGRESS", label: "En progreso", dotClass: "bg-accent" },
];

const DONE_COLUMN = {
  key: "DONE",
  label: "Completada",
  dotClass: "bg-success",
};

const STATUS_ICONS = {
  PENDING: Circle,
  IN_PROGRESS: Clock,
  DONE: CheckCircle2,
};

const PROJECT_TAG_STYLES = [
  "bg-[#eef2ff] text-[#4338ca]",
  "bg-[#ecfdf5] text-[#047857]",
  "bg-[#fff7ed] text-[#c2410c]",
  "bg-[#fdf4ff] text-[#a21caf]",
  "bg-[#eff6ff] text-[#1d4ed8]",
];

function getProjectTagStyle(projectId) {
  return PROJECT_TAG_STYLES[projectId % PROJECT_TAG_STYLES.length];
}

function TaskCard({ task, project, onAdvanceStatus, onDelete }) {
  const StatusIcon = STATUS_ICONS[task.status];

  return (
    <Card className="flex flex-col gap-2 p-4">
      {project && (
        <span
          className={`self-start text-xs font-semibold px-2 py-0.5 rounded-full ${getProjectTagStyle(
            project.id,
          )}`}
        >
          {project.name}
        </span>
      )}

      <p
        className={`text-sm font-medium ${
          task.status === "DONE" ? "line-through text-text-muted" : "text-text"
        }`}
      >
        {task.title}
      </p>

      <div className="flex items-center justify-between">
        <button
          onClick={() => onAdvanceStatus(task)}
          className={`cursor-pointer ${
            task.status === "DONE"
              ? "text-success"
              : "text-text-muted hover:text-accent"
          }`}
          title="Avanzar estado"
        >
          <StatusIcon className="w-4 h-4" />
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-text-muted hover:text-danger cursor-pointer"
          title="Eliminar tarea"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}

function StatusSection({
  column,
  tasks,
  projects,
  gridClassName,
  onAdvanceStatus,
  onDelete,
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${column.dotClass}`} />
          <span className="text-xs font-bold uppercase tracking-wide text-text-muted">
            {column.label}
          </span>
        </div>
        <span className="text-xs font-semibold text-text-muted bg-gray-100 rounded-full px-2 py-0.5">
          {tasks.length}
        </span>
      </div>

      {tasks.length === 0 ? (
        <p className="text-sm text-text-muted">Sin tareas en este estado</p>
      ) : (
        <div className={gridClassName}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              project={projects.find((p) => p.id === task.projectId)}
              onAdvanceStatus={onAdvanceStatus}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const [filterProjectId, setFilterProjectId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
      setIsModalOpen(false);
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleAdvanceStatus(task) {
    const currentIndex = STATUS_ORDER.indexOf(task.status);
    const newStatus = STATUS_ORDER[(currentIndex + 1) % STATUS_ORDER.length];

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

  const visibleTasks = filterProjectId
    ? tasks.filter((task) => task.projectId === filterProjectId)
    : tasks;

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-text">Tareas</h1>
          <p className="text-text-muted text-sm mt-1">
            Lo activo primero, lo terminado abajo
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-1.5"
        >
          <Plus className="w-4 h-4" />
          Nueva tarea
        </Button>
      </div>

      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-text">Nueva tarea</h2>
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="text-text-muted hover:text-text cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

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

          <Button type="submit">Crear tarea</Button>
        </form>
      </Modal>

      {tasks.length === 0 ? (
        <EmptyState
          icon={ListTodo}
          title="Todavía no tienes tareas"
          description="Crea la primera con el botón de arriba"
        />
      ) : (
        <>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterProjectId(null)}
              className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
                filterProjectId === null
                  ? "bg-accent text-white"
                  : "bg-white border border-border text-text-muted hover:bg-gray-50"
              }`}
            >
              Todos
            </button>
            {projects.map((project) => (
              <button
                key={project.id}
                onClick={() => setFilterProjectId(project.id)}
                className={`px-3.5 py-1.5 rounded-full text-sm font-medium transition cursor-pointer ${
                  filterProjectId === project.id
                    ? "bg-accent text-white"
                    : "bg-white border border-border text-text-muted hover:bg-gray-50"
                }`}
              >
                {project.name}
              </button>
            ))}
          </div>

          {/* Pendiente + En progreso: lado a lado, lo importante arriba */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {ACTIVE_COLUMNS.map((column) => (
              <StatusSection
                key={column.key}
                column={column}
                tasks={visibleTasks.filter(
                  (task) => task.status === column.key,
                )}
                projects={projects}
                gridClassName="grid grid-cols-1 sm:grid-cols-2 gap-4"
                onAdvanceStatus={handleAdvanceStatus}
                onDelete={handleDelete}
              />
            ))}
          </div>

          {/* Completada: abajo, separada, a todo lo ancho */}
          <div className="pt-6 border-t border-border">
            <StatusSection
              column={DONE_COLUMN}
              tasks={visibleTasks.filter((task) => task.status === "DONE")}
              projects={projects}
              gridClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              onAdvanceStatus={handleAdvanceStatus}
              onDelete={handleDelete}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default TasksPage;
