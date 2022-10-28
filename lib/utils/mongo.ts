import * as mongoDB from "mongodb";
import { Page, User, Usergroup } from "./global"

const mongo_pagename = "mongo";
const mongo_pass = "mongoPass";
const authMechanism = "DEFAULT";

const url = `mongodb://${mongo_pagename}:${mongo_pass}@localhost:27017/?authMechanism=${authMechanism}`;

const client = new mongoDB.MongoClient(url);

export const collections: {
  pages?: mongoDB.Collection,
  users?: mongoDB.Collection,
  usergroups?: mongoDB.Collection,
  media?: mongoDB.Collection
} = {}

export const connect = async () => {
  console.log("Connecting to mongodb.....")
  await client.connect();
  const db = client.db("example");
  collections.pages = db.collection("page");
  collections.users = db.collection("users");
  collections.usergroups = db.collection("usergroups");
  collections.media = db.collection("media");
  console.log("Connected!")
}


/* ----------------   Page Functions ----------------------  */

export const page_list = async (page: number, limit: number) => {
  return await collections.pages?.find({}).skip(page * limit).limit(limit).toArray();
}

export const get_page_by_id = async (_id: number) => {
  return await collections.pages?.find({ _id }).toArray();
}
export const get_page_by_title = async (title: string) => {
  return await collections.pages?.find({ title }).toArray();
}

export const insert_ppage = async (page: Page) => {
  const res = await collections.pages?.insertOne(page as any)
  return res?.acknowledged || false;
}

export const edit_page = async (_id: string, page: Page) => {
  const res = await collections.pages?.updateOne({ _id }, page);
  return res?.acknowledged || false;
}

export const delete_all_pages = async () => {
  collections.pages?.deleteMany({});
}

//users.deleteone({"age":0});//ageが0のデータを一つ削除
//users.deletemany({"age":{"$lte": 4}}) //ageが4以下のデータを削除
// users.deletemany({}) // 全データ削除
export const count_pages = async () => {
  const res = await collections.pages?.count({});
  return res;
}

export const page_month_stats = async () => {
  const pipeline = [
    { $match: {} },
    { $group: { _id: { $dateToString: { date: "$created", format: "%Y-%m" } }, count: { $sum: 1 } } }
  ];
  const aggCursor = collections.pages?.aggregate(pipeline);
  let res = [];
  for await (const doc of aggCursor || []) res.push(doc);
  return res;
}

/* ----------------   User Functions ----------------------  */
export const get_all_users = async () => {
  const res = await collections.users?.find({}).toArray();
  return res;
}

export const delete_user = async (id: number) => {
  const res = await collections.users?.deleteOne({ id });
  return res?.acknowledged || false;
}

export const edit_user = async (id: string, user: User) => {
  console.log("Edited User = ", user);
  const res = await collections.users?.updateOne({ id }, { $push: user });
  return res?.acknowledged || false;
}

export const put_user = async (user_: User) => {
  const count = await collections.users?.count({}) as number;
  let user = user_;
  user["id"] = count + 1;
  const res = await collections.users?.insertOne(user as any);
  return res?.acknowledged || false;
}

export const delete_all_users = async () => {
  const res = await collections.users?.deleteMany({});
  return res?.acknowledged || false;
}

/* ----------------   Usergroup Functions ----------------------  */
export const get_all_usergroups = async () => {
  const res = await collections.usergroups?.find({}).toArray();
  return res;
}

export const delete_usergroup = async (id: string) => {
  const res = await collections.usergroups?.deleteOne({ id });
  return res?.acknowledged || false;
}

export const edit_usergroup = async (old_group_name: string, group: Usergroup) => {
  console.log("Edited Usergroup = ", old_group_name, group);
  const res = await collections.usergroups?.updateOne({ name: old_group_name }, { $set: group });
  return res?.acknowledged || false;
}

export const put_usergroup = async (groupname: string) => {
  console.log("New Usergroup = ", groupname);
  const res = await collections.usergroups?.insertOne({ name: groupname, users: [] });
  return res?.acknowledged || false;
}

export const delete_all_usergroups = async () => {
  const res = await collections.usergroups?.deleteMany({});
  return res?.acknowledged || false;
}

/* ----------------   Page Functions ----------------------  */

export const get_collections = () => { return collections; }

connect();

