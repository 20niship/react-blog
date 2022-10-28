import * as mongo from "../../backend/mongo";
import { useBody } from 'h3'

export default async (req, res) => {
  if (req.method !== "POST") {
    console.error("method nont allowd!");
    return { err: "method not allowed!" };
  }

  const query = await useBody(req);
  const q = query?.query || "";

  switch (q) {
    case 'month_aggregate':
      {
        const stats = await mongo.page_month_stats();
        return stats;
      }
    case 'all_tags':
      {
        const col = mongo.get_collections().pages;
        const pipeline = [
          { $match: {} },
          { $group: { _id: "$tag", count: { $sum: 1 } } }
        ];
        const aggCursor = col?.aggregate(pipeline);
        let res = [];
        for await (const doc of aggCursor || []) res.push(doc);
        return { tags: res }
      }

    default:
      console.error("Invalid query!");
      return { err: "Invalid query!" };
  }
}
