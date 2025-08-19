import React from "react";
import "../styles/styles.css";

export default function StatsCard({ stats }) {
  return (
    <div className="stats">
      <p><strong>Word Count:</strong> {stats.wordCount}</p>
      <p><strong>Characters:</strong> {stats.charCount}</p>
      <p><strong>Reading Time:</strong> {stats.readingTime} min</p>
      <p><strong>Reading Ease:</strong> {stats.readingEase}</p>
      <p><strong>Grade Level:</strong> {stats.gradeLevel}</p>
    </div>
  );
}
