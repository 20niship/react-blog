import type { NextApiRequest, NextApiResponse } from 'next'
import connect from '@/lib/mongo_connect'
import { models } from '@/lib/mongo'

type Stat = {
  month: string,
  count: number,
}

type Data = {
  stats: Stat[]
}

const page_month_stats = async () => {
  const pipeline = [
    { $match: {} },
    { $group: { _id: { $dateToString: { date: "$create", format: "%Y-%m" } }, count: { $sum: 1 } } }
  ];
  const res = await models.Post.aggregate(pipeline);
  if (res == undefined) return [];
  return res.map(x => { return { month: x._id, count: x.count } })
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    console.error("method nont allowd!");
    res.status(500).json({ err: "method not allowed!" });
  }
  await connect();
  const stats = await page_month_stats();
  res.status(200).json({ stats })
}
