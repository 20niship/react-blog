import { Db, MongoClient, Collection, Int32 } from "mongodb";
const NumberInt = Int32;
import { Page, User, Usergroup } from "../global"

let cachedClient: MongoClient;
let cachedDb: Db;
export const collections: {
  pages?: Collection,
  users?: Collection,
  usergroups?: Collection,
  media?: Collection
} = {}

export async function connect() {
  if (cachedClient && cachedDb) {
    return {
      client: cachedClient,
      collections,
      db: cachedDb,
    };
  }

  const mongo_pagename = "mongo";
  const mongo_pass = "mongoPass";
  const authMechanism = "DEFAULT";
  const url = `mongodb://${mongo_pagename}:${mongo_pass}@localhost:27017/?authMechanism=${authMechanism}`;
  const db_name = "example";

  const client = new MongoClient(url);
  await client.connect();
  const db = client.db(db_name);

  cachedClient = client;
  cachedDb = db;
  collections.pages = db.collection("page");
  collections.users = db.collection("users");
  collections.usergroups = db.collection("usergroups");
  collections.media = db.collection("media");
  return {
    client: cachedClient,
    db: cachedDb,
    collections,
  };
}

/* ----------------   Page Functions ----------------------  */
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

export const page2json = (page: Page) => {
  page._id = "";
  page.update = FormatDate(page.update);
  page.create = FormatDate(page.create);
  return page;
}

export const pages2json = (pages: Page[]) => {
  return pages.map(p => {
    p._id = "";
    p.update = FormatDate(p.update);
    p.create = FormatDate(p.create);
    return p;
  })
}

export const page_list = async (page: number, limit: number) => {
  const p = await collections.pages?.find<Page>({}).skip(page * limit).limit(limit).toArray();
  if (p == undefined) return [];
  return pages2json(p);
}

export const get_page_by_id = async (id: number): (Page | null) => {
  const p = await collections.pages?.findOne<Page>({ id: NumberInt(id) });
  if (p == undefined || p == null) return null;
  return page2json(p);
}
export const get_page_by_title = async (title: string) => {
  const p = await collections.pages?.find<Page>({ title }).toArray();
  return pages2json(p);
}

export const insert_page = async (page: Page) => {
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
    { $group: { _id: { $dateToString: { date: "$create", format: "%Y-%m" } }, count: { $sum: 1 } } }
  ];
  const res= await collections.pages?.aggregate(pipeline).toArray();
  return res.map(x => { return { month: x._id, count: x.count } })
}

export const get_all_tags = async () => {
  const pipeline = [
    { $match: {} },
    { $group: { _id: "$tags", count: { $sum: 1 } } }
  ];
  const tags = await collections.pages?.aggregate(pipeline).toArray();
  return tags.map(x => { return { name: x._id[0], count: x.count } })
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

// connect();

