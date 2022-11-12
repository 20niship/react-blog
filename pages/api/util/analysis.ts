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
  const js = {
    view: {
      all: 12355,
      year: 1111,
      month: 12244,
      week: 1244,
      day: 1022,
      history: [
        { day: Date.now(), count: 101 },
        { day: Date.now(), count: 101 },
        { day: Date.now(), count: 101 },
        { day: Date.now(), count: 101 },
      ],
    },
    comment: {
      all: 258,
      public: 200,
      waiting: 20,
      deleted: 10,
    },
    post: {
      all: 273,
      public: 200,
      draft: 22,
      deleted: 2
    },
    error: {
      count: 22,
    },
  }
  res.status(200).json(js)
}
