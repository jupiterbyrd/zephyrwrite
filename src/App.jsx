import React, { useState } from "react";
import { fetchNotionText } from "./lib/notion";
import { getReadabilityStats } from "./lib/readability";

export default function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRefresh() {
    setLoading(true);
    const text = await fetchNotionText("YOUR_PAGE_ID");
    const metrics = getReadabilityStats(text);
    setStats(metrics);
    setLoading(false);
  }

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-2xl shadow-md text-gray-800">
      <h1 className="text-xl font-bold mb-3">ZephrWrite</h1>

      <button 
        onClick={handleRefresh}
        className="px-4 py-2 bg-black text-white rounded-lg shadow"
        disabled={loading}
      >
        {loading ? "Loading..." : "Refresh Stats"}
      </button>

      {stats && (
        <div className="mt-4 space-y-2">
          <p><strong>Word Count:</strong> {stats.wordCount}</p>
          <p><strong>Reading Time:</strong> {stats.readingTime} min</p>
          <p><strong>Reading Ease:</strong> {stats.readingEase}</p>
          <p><strong>Grade Level:</strong> {stats.gradeLevel}</p>
        </div>
      )}
    </div>
  );
}
