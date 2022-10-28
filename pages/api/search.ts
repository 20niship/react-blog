import * as mongo from "../../backend/mongo";
import { User, Page, Usergroup } from "../../backend/global"
import { useBody, useQuery } from 'h3'

const clamp = (x: number, min: number, max: number) => { return Math.max(Math.min(x, max), min); }

export default async (req, res) => {
  const query = (req.method === 'GET') ? useQuery(req) : await useBody(req);
  switch (req.method) {
    case 'GET':
      {
        let page = clamp(query?.page || 0, 0, 99999);
        let limit = clamp(query?.limit || 20, 5, 50);
        let search_type = query?.type || "latest";
        console.log(page, limit, search_type)
        switch (search_type) {
          case 'latest':
            return await mongo.page_list(page, limit);

          default:
            console.error("not defined search_type", search_type)
            return { err: "Not defined search_type" }
        }
      }

    case 'POST':
      {
        const type = query?.type || "";
        switch(type){
          case 'count':
            return await mongo.count_pages();
        }
      }

    default:
      console.error("Error: method not defined --> ", req.method)
      return { error: "Not defined method!!" }
  }
}

