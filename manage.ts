import fs from 'fs';
import * as db from "./lib/utils/mongo"
import { Page, User, Usergroup } from "./lib/global"

process.on('uncaughtException', function(err) {
  // console.log(JSON.stringify(err, null, 4)); // (Optional) beautiful indented output.
  console.log(err);
});

const sleep = (msec: number) => new Promise(resolve => setTimeout(resolve, msec));

const json_file = "~/Download/output.json";

const insert_pages = async () => {
  console.log("---------     insert items start -------------------")
  const txt = fs.readFileSync(json_file);
  console.log(txt.toString().slice(0, 200))
  const { page } = JSON.parse(txt.toString());
  let pages: Page[] = [];
  for (let p of page) {
    p.updated = new Date(p.updated);
    p.created = new Date(p.created);
    console.log(p)
    pages.push(p);
  }
  console.log("inserting...")
  console.log("Page size = ", pages.length);
  for (let i = 0; i < 5; i++) console.log(pages[i].title);
  await db.collections.pages?.insertMany(pages as any);
  console.log("Done!")
}

const insert_example_users = async () => {
  await db.delete_all_users();
  await db.delete_all_usergroups()

  const users: User[] = [
    { id: 0, name: "user0", register: Date.now(), editcount: 1, email: "0@gmail.com", enabled: true, isadmin: true },
    { id: 1, name: "user1", register: Date.now(), editcount: 5, email: "0@gmail.com", enabled: true, isadmin: true },
    { id: 2, name: "20aa", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
    { id: 3, name: "20b", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
    { id: 6, name: "20ccc", register: Date.now(), editcount: 0, email: "0@gmail.com", enabled: true, isadmin: false },
    { id: 10, name: "20dddd", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
    { id: 7, name: "19aaa", register: Date.now(), editcount: 21, email: "0@gmail.com", enabled: true, isadmin: false },
    { id: 8, name: "19bbb", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
    { id: 9, name: "19oj", register: Date.now(), editcount: 35, email: "0@gmail.com", enabled: true, isadmin: false },
    { id: 12, name: "18olinv", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
  ]
  await db.collections.users?.insertMany(users as any);

  const usergroups: Usergroup[] = [
    { name: "20er", users: [2, 3, 6, 10] },
    { name: "19er", users: [9, 8, 7] }
  ]
  await db.collections.usergroups?.insertMany(usergroups as any);
}


const main = async () => {
  console.log("Sleeping (waiting for mongoDB connection).......");
  await sleep(2000);
  await db.delete_all_pages();
  await db.delete_all_users();
  await db.delete_all_usergroups();
  await insert_pages();
  await insert_example_users();
  console.log("End!");
}

main()

