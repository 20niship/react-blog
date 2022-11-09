import { Page } from "../../lib/global"
import { connect, get_latest_small, get_favorites_small } from "../../lib/utils/mongo"

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

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const query = req.method === "GET" ? req.query : req.body;
  // q = query string
  // t = tags
  // d = date( crreated )
  let { page, n, is_short, sort, q, t, d } = query;
  page = clamp(page, 0, 99999);
  n = clamp(n, 5, 50);

  if (req.method !== "GET" && req.method !== "POST") {
    res.status(500).json({ pages: [], err: "Method not allowed!" })
    return;
  }
  await connect();
  if (is_short) {
    n = 7;
    let pages: Page[] = [];
    switch (sort) {
      case "lgtm":
        pages = await get_favorites_small(page, n);
        break;
      case "latest":
      default:
        pages = await get_latest_small(page, n);
    }
    res.status(200).json({ pages, err: {} });
    return;
  }
}

