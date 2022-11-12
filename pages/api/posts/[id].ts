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
    await connect();
    await models.Post.findByIdAndRemove({ _id });
    res.status(200).json({ post: { _id } })
  } catch (error) {
    res.status(500).json(error)
  }
}

const update_post = async (id: string, post: Post, res: NextApiResponse) => {
  try {
    const filter = { _id: id };
    let updater = {
      update: Date.now()
    } as any;
    if (post.context !== undefined) updater.context = post.context;
    await connect();
    const r = await models.Post.findOneAndUpdate(filter, updater);
    res.status(200).json({ post: r })
  } catch (error) {
    res.status(500).json(error)
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const query = req.method === "GET" ? req.query : req.body;
  const id = req.query?.id as string;
  switch (req.method) {
    case "GET": {
      const posts = await search(query);
      res.status(200).json({ posts });
      break;
    }

    case "POST": {
      if (query.post == undefined) {
        console.error("no post field!");
        res.status(500).json({ err: "no post field!" })
      } else {
        console.log(query);
        await update_post(id, query?.post, res);
      }
      break;
    }

    case "DELETE": {
      console.log("DElete post");
      await delete_post(id, res);
      break;
    }

    default:
      console.error("Method not Allowed!!");
      res.status(401).json({ err: "method not allowed" })
  }
}

