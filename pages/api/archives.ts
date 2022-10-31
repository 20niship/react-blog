import * as mongo from "../../lib/utils/mongo";
import type { NextApiRequest, NextApiResponse } from 'next'
import { connect, page_month_stats} from '../../lib/utils/mongo';

type Stat = {
  month:string,
  count:number,
}

type Data = {
  stats: Stat[]
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
