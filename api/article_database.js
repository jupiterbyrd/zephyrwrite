// /api/notion.js
import { Client } from "@notionhq/client";

export default async function handler(req, res) {
  try {
    const notion = new Client({ auth: process.env.NOTION_API_KEY });

    /* const page = await notion.pages.retrieve({ page_id: pageId });
    console.log(page);*/
    const databaseId = process.env.NOTION_DATABASE_ID;
    const response = await notion.databases.retrieve({
      database_id: databaseId,
    });
    console.log(response);

    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
