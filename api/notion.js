import "dotenv/config";
const { Client } = require("@notionhq/client");

const notion = new Client({
  auth: process.env.NOTION_API_KEY,
});

export default async function handler(req, res) {
  const { pageId } = req.query;

  try {
    console.log("HOOO");
    const page = await notion.pages.retrieve({ page_id: pageId });
    console.log("HAAA");
    res.status(200).json(page);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
