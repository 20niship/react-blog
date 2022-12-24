// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
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

  const create = async () => {
    const user: Prisma.UserCreateInput = {
      username: 'hog:whoge:whoge',
      email: 'alice@le.com',
      image: 'com'
    }
    await prisma.user.create({
      data: user
    })
  }
  create();
  res.status(200).json({ name: 'John Doe' })
}
