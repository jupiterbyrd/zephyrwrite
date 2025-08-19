import React, { useState } from "react";
import RefreshButton from "./components/RefreshButton";
import StatsCard from "./components/StatsCard";
import { fetchNotionText } from "./lib/notion";
import { getReadabilityStats } from "./lib/readability";
import "./styles/styles.css";

function App() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleRefresh() {
    setLoading(true);
   
    const text = await fetchNotionText();
    console.log(text);
    const metrics = getReadabilityStats(text);
    setStats(metrics);
    setLoading(false);
  }

  return (
    <div className="container">
        <img src="zephyrwrite.jpg"/>
      <h1>ZephrWrite</h1>
      <RefreshButton onClick={handleRefresh} loading={loading} />
      {stats && <StatsCard stats={stats} />}
    </div>
  );
}


export default App
