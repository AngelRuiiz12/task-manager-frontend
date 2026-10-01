import { Link } from "react-router";
import { useEffect, useState } from "react";
import {
  ListTodo,
  CheckCircle2,
  Clock,
  Circle,
  FolderKanban,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../api/tasks";
import { getProjects } from "../api/projects";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

const STATUS_ICONS = {
  PENDING: Circle,
  IN_PROGRESS: Clock,
};

function StatCard({ icon: Icon, label, value, to }) {
  return (
    <Link to={to} className="h-full">
      <Card className="h-full flex flex-col items-center justify-center text-center gap-2 hover:border-accent transition">
        <div className="bg-background p-3 rounded-lg">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <p className="text-2xl font-semibold text-text">{value}</p>
        <p className="text-sm text-text-muted">{label}</p>
      </Card>
    </Link>
  );
}

function HomePage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const { token, user } = useAuth();

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

  if (loading) return <Spinner />;

  if (error) {
    return <p className="text-center text-danger p-8">{error}</p>;
  }

  const pendingCount = tasks.filter((t) => t.status === "PENDING").length;
  const inProgressCount = tasks.filter(
    (t) => t.status === "IN_PROGRESS",
  ).length;
  const doneCount = tasks.filter((t) => t.status === "DONE").length;
  const completionPercent =
    tasks.length === 0 ? 0 : Math.round((doneCount / tasks.length) * 100);

  const recentTasks = tasks
    .filter((task) => task.status !== "DONE")
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  const projectsWithCount = projects.map((project) => ({
    ...project,
    taskCount: tasks.filter((task) => task.projectId === project.id).length,
  }));

  return (
    <div className="max-w-5xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-text">Panel de control</h1>
        <p className="text-text-muted mt-1">
          Estado actual de tus tareas y proyectos.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Circle}
          label="Pendientes"
          value={pendingCount}
          to="/tasks"
        />
        <StatCard
          icon={Clock}
          label="En progreso"
          value={inProgressCount}
          to="/tasks"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completadas"
          value={doneCount}
          to="/tasks"
        />
        <StatCard
          icon={FolderKanban}
          label="Proyectos"
          value={projects.length}
          to="/projects"
        />
      </div>

      <Card className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-text">Progreso general</p>
          <p className="text-sm font-semibold text-text">
            {completionPercent}%
          </p>
        </div>
        <div className="h-2.5 rounded-full bg-[#e0e7ff] overflow-hidden">
          <div
            className="h-full rounded-full bg-accent transition-all"
            style={{ width: `${completionPercent}%` }}
          />
        </div>
        <p className="text-xs text-text-muted">
          {doneCount} de {tasks.length} tareas completadas
        </p>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text">Tareas recientes</p>
            <Link
              to="/tasks"
              className="text-xs font-medium text-accent flex items-center gap-1 hover:underline"
            >
              Ver todas
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {recentTasks.length === 0 ? (
            <EmptyState
              icon={ListTodo}
              title="Nada pendiente"
              description="Todas tus tareas están completadas"
            />
          ) : (
            <div className="flex flex-col gap-1">
              {recentTasks.map((task) => {
                const project = projects.find((p) => p.id === task.projectId);
                const StatusIcon = STATUS_ICONS[task.status];

                return (
                  <div
                    key={task.id}
                    className="flex items-center gap-3 py-2 border-b border-border last:border-0"
                  >
                    <StatusIcon
                      className={`w-4 h-4 shrink-0 ${
                        task.status === "IN_PROGRESS"
                          ? "text-accent"
                          : "text-warning"
                      }`}
                    />
                    <span className="text-sm text-text flex-1 truncate">
                      {task.title}
                    </span>
                    {project && (
                      <span className="text-xs text-text-muted shrink-0">
                        {project.name}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text">Tus proyectos</p>
            <Link
              to="/projects"
              className="text-xs font-medium text-accent flex items-center gap-1 hover:underline"
            >
              Ver todos
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {projectsWithCount.length === 0 ? (
            <EmptyState
              icon={FolderKanban}
              title="Sin proyectos todavía"
              description="Crea uno para empezar a añadir tareas"
            />
          ) : (
            <div className="flex flex-col gap-1">
              {projectsWithCount.map((project) => (
                <div
                  key={project.id}
                  className="flex items-center justify-between py-2 border-b border-border last:border-0"
                >
                  <span className="text-sm text-text truncate">
                    {project.name}
                  </span>
                  <span className="text-xs text-text-muted shrink-0">
                    {project.taskCount}{" "}
                    {project.taskCount === 1 ? "tarea" : "tareas"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
