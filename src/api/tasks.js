export async function getTasks(token) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message);
  }

  return data;
}

export async function createTask(token, data) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = response.json();

  if (!response.ok) {
    throw new Error(result.message);
  }

  return result;
}
