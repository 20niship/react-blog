import * as mongo from "../../lib/utils/mongo";
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, page_month_stats} from '../../lib/utils/mongo';

type Data = {
  stats: any
}

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method !== "POST") {
    console.error("method nont allowd!");
    res.status(500).json({ err: "method not allowed!" });
  }
  await connect();
  const stats = await page_month_stats();
  console.log(stats)
  res.status(200).json({ stats })
}
