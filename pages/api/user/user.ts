import * as mongo from "../../backend/mongo";
import { User, Page, Usergroup } from "../../backend/global"
import { useBody, useQuery } from 'h3'

export default async (req, res) => {
  const query = (req.method === 'GET') ? useQuery(req) : await useBody(req);
  console.log(query);
  console.log("PARSED!!", query)
  switch (req.method) {
    case 'GET':
      {
        const users = await mongo.get_all_users();
        return users;
      }

    case 'POST':
      {
        const user = query as User;
        const id = (user?.id || 0) as number;
        const ok = await mongo.edit_user(id, user);
        return { ok };
      }

    case 'PUT':
      {
        let user = query as User;
        user.register = Date.now();
        const ok = await mongo.put_user(user);
        return { ok };
      }

    case 'DELETE':
      {
        const user = query as User;
        return await mongo.delete_user(user.id);
      }

    default:
      console.error("Error: method not defined --> " , req.method)
      return { error: "Not defined method!!" }
  }
}

