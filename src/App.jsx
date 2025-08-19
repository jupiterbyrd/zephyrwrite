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
   
    const text = await fetchNotionText("254869932d5e800daf03f51aaca5c36a");
   
    const metrics = getReadabilityStats(text);
    //const metrics = getReadabilityStats("")
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
