export async function fetchNotionText(pageId) {
  const res = await fetch(`/api/notion?pageId=${pageId}`);

  return await res.json();
}
