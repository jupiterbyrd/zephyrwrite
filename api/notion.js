// api/notion.js
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_API_KEY });

// database id for your "Telescopic" article database
const databaseId = process.env.NOTION_DATABASE_ID;

export default async function handler(req, res) {
  try {
    const { type, pageId } = req.query;
    console.log(req);
    if (type === "articles") {
      // Fetch all pages in the database
      const response = await notion.databases.retrieve({
        database_id: databaseId,
      });
      console.log(response);

      const articles = response.results.map((page) => ({
        id: page.id,
        title: page.properties.Name?.title[0]?.plain_text || "Untitled",
        status: page.properties.Status?.select?.name || "No Status",
        category: page.properties.Category?.select?.name || "Uncategorized",
      }));

      res.status(200).json(articles);
    } else if (type === "page" && pageId) {
      // Fetch the blocks/content of a single page
      const blocks = await notion.blocks.children.list({ block_id: pageId });

      const textContent = blocks.results
        .map((block) => {
          if (block.paragraph?.rich_text) {
            return block.paragraph.rich_text.map((t) => t.plain_text).join(" ");
          }
          if (block.heading_1?.rich_text) {
            return block.heading_1.rich_text.map((t) => t.plain_text).join(" ");
          }
          if (block.heading_2?.rich_text) {
            return block.heading_2.rich_text.map((t) => t.plain_text).join(" ");
          }
          if (block.heading_3?.rich_text) {
            return block.heading_3.rich_text.map((t) => t.plain_text).join(" ");
          }
          if (block.bulleted_list_item?.rich_text) {
            return block.bulleted_list_item.rich_text
              .map((t) => t.plain_text)
              .join(" ");
          }
          return "";
        })
        .join("\n");

      res.status(200).json(textContent);
    } else {
      res.status(400).json({ error: "Invalid request" });
    }
  } catch (err) {
    console.error("Notion API error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
