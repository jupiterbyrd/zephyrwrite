export async function fetchNotionDatabase(pageId) {
  const res = await fetch(`/api/article_database?pageId=${pageId}`);

  return await res.json();
}
