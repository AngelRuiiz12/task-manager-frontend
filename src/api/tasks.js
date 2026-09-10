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
