import * as mongo from "../../lib/utils/mongo";
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, get_all_tags } from '../../lib/utils/mongo';

type Data = {
  tags: string[]
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    console.error("method nont allowd!");
    res.status(500).json({ err: "method not allowed!" });
  }
  await connect();
  const t = await get_all_tags();
  const tags = t.map(x => x.name);
  res.status(200).json({ tags })
}
