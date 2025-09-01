import React, { useState, useEffect} from "react";
import "./styles/styles.css";
import { getArticles, getPageContent } from "./lib/notion.js";
import { analyzeText } from "./lib/readability.js";
import ArticleMenu from "./components/ArticleMenu.jsx";
import StatsDisplay from "./components/StatsDisplay.jsx";

export default function App() {
  const [articles, setArticles] = useState([]);
  const [stats, setStats] = useState(null);
  const [currentPageId, setCurrentPageId] = useState(null);

  useEffect(() => {
    async function loadArticles() {
      const all = await getArticles();
      setArticles(all);
    }
    loadArticles();
  }, []);

  async function analyzePage() {
    const pageId = process.env.NOTION_DATABASE_ID;
    console.log(process.env.NOTION_DATABASE_ID);
    const content = await getPageContent(pageId);
    console.log(content);
    const analysis = analyzeText(content);
    setStats(analysis);
    setCurrentPageId(pageId);
  }

  async function refreshStats(pageId) {
    await analyzePage(pageId);
  }

  return (
    <div className="app-container">
      <ArticleMenu articles={articles} onSelect={analyzePage} />
      <StatsDisplay stats={stats} pageId={currentPageId} onRefresh={refreshStats} />
    </div>
  );
}
