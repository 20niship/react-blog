"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fs_1 = require("fs");
// import * as db from "./lib/utils/mongo"
// import { Page, User, Usergroup } from "@/lib/global"
process.on('uncaughtException', function (err) {
    // console.log(JSON.stringify(err, null, 4)); // (Optional) beautiful indented output.
    console.log(err);
});
var sleep = function (msec) { return new Promise(function (resolve) { return setTimeout(resolve, msec); }); };
var insert_pages_movable_type = function (fname) { return __awaiter(void 0, void 0, void 0, function () {
    var txt, page, pages, _i, page_1, p;
    return __generator(this, function (_a) {
        console.log("---------     insert items start -------------------");
        txt = fs_1["default"].readFileSync(fname).toString();
        console.log(txt.substr(0, 100));
        console.log(txt.toString().slice(0, 200));
        page = JSON.parse(txt.toString()).page;
        pages = [];
        for (_i = 0, page_1 = page; _i < page_1.length; _i++) {
            p = page_1[_i];
            p.updated = new Date(p.updated);
            p.created = new Date(p.created);
            console.log(p);
            pages.push(p);
        }
        return [2 /*return*/];
    });
}); };
// const insert_pages = async () => {
//   console.log("---------     insert items start -------------------")
//   const txt = fs.readFileSync(json_file);
//   console.log(txt.toString().slice(0, 200))
//   const { page } = JSON.parse(txt.toString());
//   let pages: Page[] = [];
//   for (let p of page) {
//     p.updated = new Date(p.updated);
//     p.created = new Date(p.created);
//     console.log(p)
//     pages.push(p);
//   }
//   console.log("inserting...")
//   console.log("Page size = ", pages.length);
//   for (let i = 0; i < 5; i++) console.log(pages[i].title);
//   await db.collections.pages?.insertMany(pages as any);
//   console.log("Done!")
// }
// const insert_example_users = async () => {
//   await db.delete_all_users();
//   await db.delete_all_usergroups()
//   const users: User[] = [
//     { id: 0, name: "user0", register: Date.now(), editcount: 1, email: "0@gmail.com", enabled: true, isadmin: true },
//     { id: 1, name: "user1", register: Date.now(), editcount: 5, email: "0@gmail.com", enabled: true, isadmin: true },
//     { id: 2, name: "20aa", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
//     { id: 3, name: "20b", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
//     { id: 6, name: "20ccc", register: Date.now(), editcount: 0, email: "0@gmail.com", enabled: true, isadmin: false },
//     { id: 10, name: "20dddd", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
//     { id: 7, name: "19aaa", register: Date.now(), editcount: 21, email: "0@gmail.com", enabled: true, isadmin: false },
//     { id: 8, name: "19bbb", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
//     { id: 9, name: "19oj", register: Date.now(), editcount: 35, email: "0@gmail.com", enabled: true, isadmin: false },
//     { id: 12, name: "18olinv", register: Date.now(), editcount: 8, email: "0@gmail.com", enabled: true, isadmin: false },
//   ]
//   await db.collections.users?.insertMany(users as any);
//   const usergroups: Usergroup[] = [
//     { name: "20er", users: [2, 3, 6, 10] },
//     { name: "19er", users: [9, 8, 7] }
//   ]
//   await db.collections.usergroups?.insertMany(usergroups as any);
// }
var json_file = "~/Download/export.txt";
var main = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Sleeping (waiting for mongoDB connection).......");
                // await sleep(2000);
                // await db.delete_all_pages();
                // await db.delete_all_users();
                // await db.delete_all_usergroups();
                return [4 /*yield*/, insert_pages_movable_type(json_file)];
            case 1:
                // await sleep(2000);
                // await db.delete_all_pages();
                // await db.delete_all_users();
                // await db.delete_all_usergroups();
                _a.sent();
                // await insert_example_users();
                console.log("End!");
                return [2 /*return*/];
        }
    });
}); };
main();
