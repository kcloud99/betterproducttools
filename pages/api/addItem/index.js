// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Client } from "@notionhq/client"

export default function handler(req, res) {

  const notion = new Client({ auth: process.env.NOTION_KEY })

  const databaseId = process.env.NOTION_DATABASE

  (async () => {
    try {
      const response = await notion.pages.create({
        parent: { database_id: databaseId },
        properties: {
          title: {
            title:[
              {
                "text": {
                  "content": "New Entry"
                }
              }
            ]
          },
          Site: {},
          Name: {},
          Tags: {},
          Description: {},
        },
      })
      console.log(response)
      console.log("Success! Entry added.")
      res.status(200).json(response)
    } catch (error) {
      console.error(error.body)
    }
  })()
}