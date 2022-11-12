import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/lib/mongo_connect'
import { models } from '@/lib/mongo'

type Data = {
  tags: string[]
}

const get_all_tags = async () => {
  const pipeline = [
    { $match: {} },
    { $group: { _id: "$tags", count: { $sum: 1 } } }
  ];
  const tags = await models.Post.aggregate(pipeline);
  if (tags == undefined) return [];
  return tags.map(x => { return { name: x._id[0], count: x.count } })
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
