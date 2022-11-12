import { Post } from "@/lib/global"
import connect from '@/lib/mongo_connect'
import { search, models } from '@/lib/mongo'
import type { NextApiRequest, NextApiResponse } from 'next'

const clamp = (x: number, min: number, max: number) => { return Math.max(Math.min(x, max), min); }

import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  page: number,
  n: number,
  is_short: boolean,
  name: string,
  q: string,
  d: string,
  t: string
}
const delete_post = async (_id: string, res: NextApiResponse) => {
  try {
    await models.Post.findByIdAndRemove({ _id });
  } catch (error) {
    res.status(500).json(error)
  }
}

const update_post = async (post: Post, res: NextApiResponse) => {
  console.log("updateing: ", post);
  try {
    const filter = { _id: post._id };
    const newpost = post; //TODO
    const r = await models.Post.findOneAndUpdate(filter, newpost);
    console.log(r)
  } catch (error) {
    res.status(500).json(error)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const query = req.method === "GET" ? req.query : req.body;
  switch (req.method) {
    case "GET": {
      const posts = await search(query);
      res.status(200).json({ posts });
      break;
    }

    case "POST": {
      await update_post(query, res);
      break;
    }

    case "DELETE": {
      console.log("DElete post");
      await delete_post(query._id, res);
    }
  }
}

