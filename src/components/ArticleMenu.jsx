// components/ArticleMenu.jsx
import React from "react";

export default function ArticleMenu({ articles, onSelect }) {
  return (
    <div className="article-menu">
      <h3>Your Articles</h3>
      <ul>
        {articles.map(article => (
          <li
            key={article.id}
            onClick={() => onSelect(article.id)}
            style={{
              borderLeft: `6px solid ${
                article.status === "Published" ? "green" :
                article.status === "In Progress" ? "orange" : "gray"
              }`,
              cursor: "pointer",
              padding: "4px 8px",
              margin: "4px 0"
            }}
          >
            {article.title}
            {article.tags.length > 0 && (
              <span className="tags">
                {article.tags.map(tag => (
                  <span key={tag.id} style={{ color: tag.color, marginLeft: "6px" }}>
                    #{tag.name}
                  </span>
                ))}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
