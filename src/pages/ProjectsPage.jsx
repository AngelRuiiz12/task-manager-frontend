import { useEffect, useState } from "react";
import { Plus, FolderKanban } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { createProject, getProjects } from "../api/projects";
import Card from "../components/ui/Card";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Spinner from "../components/ui/Spinner";
import EmptyState from "../components/ui/EmptyState";

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
      setName("");
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
          <h2 className="text-lg font-semibold text-text">Nuevo proyecto</h2>

          <Input
            label="Nombre"
            id="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Button
            type="submit"
            className="self-start flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Crear proyecto
          </Button>
        </form>
      </Card>

      {projects.length === 0 ? (
        <EmptyState
          icon={FolderKanban}
          title="Todavía no tienes proyectos"
          description="Crea el primero con el formulario de arriba"
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {projects.map((project) => (
            <Card key={project.id} className="flex items-center gap-3">
              <FolderKanban className="w-5 h-5 text-accent shrink-0" />
              <span className="text-text font-medium">{project.name}</span>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProjectsPage;
