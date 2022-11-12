import mongoose from 'mongoose'
import { ViewStatus, Post, User, } from './global'
import dbconnect from './mongo_connect'
import { page2json, pages2json } from './parser'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 3, max: 20 },
  email: { type: String, required: true, unique: true, min: 3, max: 20 },
  password: { type: String, required: true, unique: true, min: 3, max: 20 },
  editcount: { type: Number, required: true, },
  isadmin: { type: Boolean, required: true, },
},
  { timestamps: { createdAt: 'create', updatedAt: 'update' }, collection: "user" }
);

const PostSchema = new mongoose.Schema({
  title: { type: String, default: "Empty Title" },
  tags: { type: Array<String>, default: [] },
  user: { type: Number, required: true },
  context: { type: String, default: "" },
  icon: { type: String, default: "" },
  status: { type: Number, required: true },
  lgtm: { type: Number, default: 0 },
  viewcount: { type: Number, default: 0 },
},
  { timestamps: { createdAt: 'create', updatedAt: 'update' }, collection: "post" }
)

console.log("creating model...")
export const models = {
  User: mongoose.models.User || mongoose.model('User', UserSchema),
  Post: mongoose.models.Post || mongoose.model('Post', PostSchema)
}

export const get_post = async (id: string): Promise<Post | null> => {
  await dbconnect();
  const post = await models.Post.findById(id).lean();
  if (post == null) return null;
  return page2json(post);
}

const small_fields = { title: 1, user: 1, tags: 1, lgtm: 1, create: 1, update: 1, published: 1, icon: 1, id: 1 }

export const latest = async (page: number = 0, limit: number = 20) => {
  const p = await models.Post.find({ status: ViewStatus.Published }, null, { sort: { update: -1 }, start: limit * page, limit }).lean<Post[]>();
  return pages2json(p);
}

export const latest_with_draft = async (page: number = 0, limit: number = 20) => {
  await dbconnect();
  const p = await models.Post.find({}, null, { sort: { update: "desc" }, skip: limit * page, limit }).lean<Post[]>();
  return pages2json(p);
}

export const latest_small = async (page: number = 0, limit: number = 20) => {
  const p = await models.Post.find({ status: ViewStatus.Published }, null, { sort: { lgtm: 1 }, skip: limit * page, limit, projection: small_fields }).lean<Post[]>();
  return pages2json(p);
}

export const favorites_small = async (page: number, limit: number) => {
  const p = await models.Post.find({ status: ViewStatus.Published }, null, { sort: { lgtm: 1 }, skip: limit * page, limit, projection: small_fields }).lean<Post[]>();
  return pages2json(p);
}

export const search = async (query:any) => {
  const page = query?.page || 0;
  const limit = query?.limit || 20;
  console.log(page*limit, limit)
  const posts = await latest_with_draft(page, limit);
  const count = await models.Post.countDocuments({});
  return { posts, count }
}


