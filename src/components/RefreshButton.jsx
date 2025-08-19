import React from "react";
import "../styles/styles.css";

export default function RefreshButton({ onClick, loading }) {
  return (
    <button onClick={onClick} disabled={loading}>
      {loading ? "Loading..." : "Refresh Stats"}
    </button>
  );
}
