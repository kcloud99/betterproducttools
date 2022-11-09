// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@notionhq/client"

export default function handler(req, res) {

  const notion = new Client({ auth: process.env.NOTION_API })

  const databaseId = process.env.NOTION_DATABASE

  let items;

  (async () => {
    items = await notion.databases.query({ database_id: databaseId });
    console.log(items.results);
    if (items) return res.status(200).json(items)
  })();
}