import React, { useState } from "react";
import "./styles/styles.css";

import React, { useEffect, useState } from "react";
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

  async function analyzePage(pageId) {
    const content = await getPageContent(pageId);
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
