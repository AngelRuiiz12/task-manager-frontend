export async function getProjects(token) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function createProject(token, name) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name }),
  });

  const data = response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}
