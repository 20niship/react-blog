import { Post } from './global'

export const FormatDate = (dt: Date) => {
  try {
    var y = dt.getFullYear();
    var m = ('00' + (dt.getMonth() + 1)).slice(-2);
    var d = ('00' + dt.getDate()).slice(-2);
    return (y + '-' + m + '-' + d);
  } catch {
    console.error("Unknown datetime -->", dt)
    return "0000-00-00"
  }
}
export const page2json = (post: Post) => {
  return {
    ...post,
    _id: post._id.toString(),
    update: FormatDate(new Date(post.update as Date)),
    create: FormatDate(new Date(post.create as Date)),
  }
}

export const pages2json = (posts: Post[]) => {
  return posts.map(p => page2json(p))
}

