// src/lib/notion.js

// Fetch all articles from your Notion database
export async function getArticles() {
  const res = await fetch("/api/notion?type=articles");
  if (!res.ok) throw new Error("Failed to fetch articles");
  return res.json();
}

// Fetch full page content (blocks) of a given Notion page
export async function getPageContent(pageId) {
  const res = await fetch(`/api/notion?type=page&pageId=${pageId}`);
  if (!res.ok) throw new Error("Failed to fetch page content");
  return res.json();
}
