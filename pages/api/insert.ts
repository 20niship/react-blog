import { insert } from '../../lib/insert_sample_posts'
import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  insert();
  res.status(200).json({ name: 'John Doe' })
}
