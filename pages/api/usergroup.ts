import * as mongo from "../../backend/mongo";
import { useBody, useQuery } from 'h3'
import {User, Page, Usergroup} from "../../backend/global"

export default async (req, res) => {
  const query = (req.method === 'GET') ? useQuery(req) : await useBody(req);
  console.log("PARSED!!", query)

  switch(req.method){
    case 'GET':
    {
      return await mongo.get_all_usergroups();
    }

    case 'POST':
    {
      const user = query as Usergroup;
      console.log("USERgroup", user)
      return await mongo.edit_usergroup(user.name, user);
    }

    case 'PUT':
    {
      const user = query as Usergroup;
      console.log("USERgroup", user.name)
      return await mongo.put_usergroup(user.name);
    }

    case 'DELETE':
    {
      const user = query as Usergroup;
      console.log("delete Usergroup", user)
      return await mongo.delete_usergroup(user.name);
    }

    default:
      return {error: "Not defined method!!"}
  }
}

