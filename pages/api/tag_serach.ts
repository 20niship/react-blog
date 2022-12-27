import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from "../../lib/prisma";
import { Prisma, PrismaClient } from "@prisma/client";

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const posts = await prisma.post.findMany({
    where: {
      tags: {
        has: 'C++',
      },
    },
  })
  console.log(posts)
  res.status(200).json({})
}

