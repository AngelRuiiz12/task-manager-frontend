import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getTasks } from "../api/tasks";

function TasksPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    async function fetchTasks() {
      try {
        const result = await getTasks(token);
        setTasks(result.data);
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTasks();
  }, []);

  if (loading) {
    return <p className="text-center text-navy p-8">Cargando tareas...</p>;
  }

  if (error) {
    return <p className="text-center text-coral p-8">{error}</p>;
  }

  if (tasks.length === 0) {
    return (
      <p className="text-center text-navy p-8">
        Todavia no tienes tareas. ¡Crea la primera!
      </p>
    );
  }

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{`${task.title} - ${task.status}`}</li>
      ))}
    </ul>
  );
}

export default TasksPage;
