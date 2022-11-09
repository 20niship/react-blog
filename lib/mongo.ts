import mongoose from 'mongoose'
import { ViewStatus, ViewStatuses, Post, User, } from './global'
import dbconnect from './mongo_connect'

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true, min: 3, max: 20 },
  email: { type: String, required: true, unique: true, min: 3, max: 20 },
  password: { type: String, required: true, unique: true, min: 3, max: 20 },
  register: { type: Number, required: true, },
  editcount: { type: Number, required: true, },
  isadmin: { type: Boolean, required: true, },
},
  { timestamps: true }
);

const PostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  tag: { type: Array<String>, required: true },
  user: { type: Number, required: true },
  update: { type: Number, required: true },
  create: { type: Number, required: true },
  context: { type: String, required: true },
  icon: { type: String, required: true },
  status: { type: Number, required: true },
  lgtm: { type: Number, required: true },
  viewcount: { type: Number, required: true },
},
  { timestamps: true }
)

export const models = {
  User: mongoose.models.User || mongoose.model('User', UserSchema),
  Post: mongoose.models.Post || mongoose.model('Post', PostSchema)
}

export const find_latest = async (page: number, limit: number): Promise<Post[]> => {
  await dbconnect();
  const posts = await models.Post.find({ published: ViewStatus.Published }, { sort: { 'update': -1 }, start: limit * page, limit });
  return posts;
}

export const get_post = async (id: string): Promise<Post | null> => {
  await dbconnect();
  const post = await models.Post.findById(id);
  return post;
}
