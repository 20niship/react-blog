import * as mongo from "../../backend/mongo";
import { Page } from "../../backend/global"
import { useBody, useQuery } from 'h3'

export default async (req, res) => {
  const query = (req.method === 'GET') ? useQuery(req) : await useBody(req);

  switch (req.method) {
    case 'GET':
    case 'POST':
      {
        const title = query.title || "";
        console.log(title)
        const pages = await mongo.get_page_by_title(title);
        return pages[0];
      }

    case 'PUT':
      {
        let page = query as Page;
        console.log("Page = ", page);
        page.update = new Date();
        await mongo.edit_page(page._id, page);
      }

    case 'DELETE':
      {
      }

    default:
      console.error("Error: method not defined --> ", req.method)
      return { error: "Not defined method!!" }
  }
}

