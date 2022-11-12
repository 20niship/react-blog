import { Post, ViewStatus } from "@/lib/global"
import connect from '@/lib/mongo_connect'
import { search, models } from '@/lib/mongo'
import { page2json } from '@/lib/parser'

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

const create_post = async (title: string, res: NextApiResponse) => {
  console.log("new post : ", title);
  try {
    await connect();
    const savePost = await new models.Post({
      title,
      user: 1,
      status: ViewStatus.Draft,
    });
    const new_post = await savePost.save()
    const post = page2json(new_post)
    res.status(200).json({ post });
  } catch (error) {
    console.error("error creating new post :")
    console.error(error)
    res.status(500).json(error);
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const query = req.method === "GET" ? req.query : req.body;
  switch (req.method) {
    case "GET": {
      const result = await search(query);
      res.status(200).json(result);
      break;
    }

    case "PUT": {
      console.log(query);
      await create_post(query?.title || "", res);
      break;
    }

    default:
      console.error("Method not Allowed!!");
      res.status(401).json({ err: "method not allowed" })
  }
}

