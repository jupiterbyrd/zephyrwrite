export async function fetchNotionText() {
  const res = await fetch(`/api/notion`);

  return await res.json();
}
