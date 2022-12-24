import prisma from "./prisma";
import { Prisma, PrismaClient } from "@prisma/client";

type Data = {
  name: string
}

let users: Prisma.UserCreateInput[] = [];
for (let i = 0; i < 10; i++) {
  users.push({
    username: "user0" + i,
    email: "email" + i
  })
}

const posts: Prisma.PostCreateInput[] = [
  {
    title: "title 1",
    context: "hogehoge",
    status: 0,
    icon: "http://icon1.jpg",
    author: { create: users[0] },
    tags: ["arduino", "C++"]
  },
  {
    title: "title 2",
    context: "日本語テキスト",
    status: 1,
    icon: "http://icon1.jpg",
    author: { create: users[1] },
    tags: ["arduino", "C++", "A"]
  },
  {
    title: "title 3",
    context: "日本語aaaaaaaテキスト",
    status: 1,
    icon: "http://icon1.jpg",
    author: { create: users[2] },
    tags: ["test"]
  },
  {
    title: "title 4",
    context: "hoskfjdh;zkjvnzs;ifjes",
    status: 1,
    icon: "http://icon1.jpg",
    author: { create: users[3] },
    tags: ["c"]
  }
]

export const insert = async () => {
  posts.map(async (post) => {
    await prisma.post.create({
      data: post
    })
  })
}

