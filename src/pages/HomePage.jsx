import { Link } from "react-router";
import { useEffect, useState } from "react";
import { ListTodo, CheckCircle2, Clock, FolderKanban } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../api/tasks";
import { getProjects } from "../api/projects";
import Card from "../components/ui/Card";
import Spinner from "../components/ui/Spinner";

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
  const [stats, setStats] = useState({
    pending: 0,
    inProgress: 0,
    done: 0,
    projects: 0,
  });
  const { token, user } = useAuth();

  useEffect(() => {
    async function fetchStats() {
      try {
        const [tasksResult, projectsResult] = await Promise.all([
          getTasks(token),
          getProjects(token),
        ]);

        const tasks = tasksResult.data;

        setStats({
          pending: tasks.filter((t) => t.status === "PENDING").length,
          inProgress: tasks.filter((t) => t.status === "IN_PROGRESS").length,
          done: tasks.filter((t) => t.status === "DONE").length,
          projects: projectsResult.data.length,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <Spinner />;

  if (error) {
    return <p className="text-center text-danger p-8">{error}</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 flex flex-col gap-8">
      <div>
        <h1 className="text-2xl font-bold text-text">
          Hola{user?.name ? `, ${user.name}` : ""} 👋
        </h1>
        <p className="text-text-muted mt-1">
          Este es el resumen de tu actividad.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          icon={Clock}
          label="Pendientes"
          value={stats.pending}
          to="/tasks"
        />
        <StatCard
          icon={ListTodo}
          label="En progreso"
          value={stats.inProgress}
          to="/tasks"
        />
        <StatCard
          icon={CheckCircle2}
          label="Completadas"
          value={stats.done}
          to="/tasks"
        />
        <StatCard
          icon={FolderKanban}
          label="Proyectos"
          value={stats.projects}
          to="/projects"
        />
      </div>
    </div>
  );
}

export default HomePage;
