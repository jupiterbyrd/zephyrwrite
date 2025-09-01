
import "../styles/styles.css";
// components/StatsDisplay.jsx
import React from "react";

export default function StatsDisplay({ stats, pageId, onRefresh }) {
  if (!stats) return <p>Select an article to view stats.</p>;

  return (
    <div className="stats-card">
      <div className="stats-header">
        <h3>Readability Stats</h3>
        {pageId && (
          <button className="refresh-button" onClick={() => onRefresh(pageId)}>
            🔄 Refresh
          </button>
        )}
      </div>
      <ul>
        <li><b>Word Count:</b> {stats.wordCount}</li>
        <li><b>Character Count:</b> {stats.charCount}</li>
        <li><b>Sentence Count:</b> {stats.sentenceCount}</li>
        <li><b>Paragraph Count:</b> {stats.paragraphCount}</li>
        <li><b>Syllable Count:</b> {stats.syllableCount}</li>
        <li><b>Reading Time:</b> {stats.readingTime} min</li>
        <li><b>Speaking Time:</b> {stats.speakingTime} min</li>
        <li><b>Flesch Reading Ease:</b> {stats.fleschEase}</li>
        <li><b>Flesch–Kincaid Grade:</b> {stats.fleschKincaid}</li>
        <li><b>Sentiment:</b> {stats.sentiment}</li>
      </ul>
    </div>
  );
}
