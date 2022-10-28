import config from './config';
import bcrypt from 'bcrypt';

import { Client } from '@elastic/elasticsearch'
import { SearchHit } from '@elastic/elasticsearch/lib/api/types';
import { Item, ImageData, SearchResponse, DBResponseStatus, ItemSearchMethod, ItemSearchQuery } from "./global";
import * as params from "./params"

const host = process.env?.ELASTIC_HOST || "http://localhost:9200";

process.on('uncaughtException', function(err) {
  console.log("console.errorOROR")
  console.log(JSON.stringify(err, null, 4)); // (Optional) beautiful indented output.
  console.log(err);
});

const client = new Client({ node: host })

export const get_count = async (): Promise<SearchResponse<any, null>> => {
  const r1 = await client.count({ index: "images" });
  const r2 = await client.count({ index: "items" })

  const r3 = await client.count({ index: "items", query: { match: { ec: "rakuten" } } })
  const r4 = await client.count({ index: "items", query: { match: { ec: "au" } } })
  const r5 = await client.count({ index: "items", query: { match: { ec: "yahoo" } } })

  const r6 = await client.count({ index: "images", query: { match: { ec: "rakuten" } } })
  const r7 = await client.count({ index: "images", query: { match: { ec: "au" } } })
  const r8 = await client.count({ index: "images", query: { match: { ec: "yahoo" } } })

  return {
    status: DBResponseStatus.OK,
    hits: {
      n_images: r1.count,
      n_items: r2.count,
      rakuten_n_items: r3.count,
      au_n_items: r4.count,
      yahoo_n_items: r5.count,
      rakuten_n_images: r6.count,
      au_n_images: r8.count,
      yahoo_n_images: r7.count,
    },
    time: 0,
    target: null
  }
}


  async check_connection(){
    try{
      await client.ping({requestTimeout: 30000});
      connected = true;
    }catch(e){
      console.error("elasticserach cluster is down!")
      connected = false;
    }
  }

  get_connection(){ return connection;}
  is_connected() { return connected; }

  async _check_index_exist(index_name){
    return (await client.indices.exists({index: index_name}));
  }

// -----------------------　indexの作成、削除    -----------------------
  async create_index() {
    console.log("Creating index......");

    try{
      // let res = await client.indices.create({ index: 'mdblog_page' });
      console.log(" 1 / 8 : creating mdblog_page index ....")
      if(await _check_index_exist("mdblog_page")){
          console.log("index already exists skipping......")
      }else{
          await client.indices.create({ index: 'mdblog_page', 
            // body: { settings : { analysis: { analyzer: {
            //       // defaultを「hoge_analyzer」とかにすると、_analyze APIなどで指定することができる。
            //       "default": { "type": "custom", "tokenizer": "kuromoji_tokenizer" }
            //     }
            // } } }
          });
          console.log(" 2 / 8 creating mdblog_page mapping......")

          await client.indices.putMapping({ index: 'mdblog_page', body: { properties: {
            title: { type: 'text'},
            content: { type: 'text'},
            tag: { type: 'keyword'},
            create_time: { type: "date", format : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"},
            update_time: { type: "date", format : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"},
            author_id : {type : "integer"},
            edit_count : {type : "integer"},
            lgtm_count : {type : "integer"},
            view_count : {type : "integer"},
            visible : {type : "boolean"},
            url : {type : "keyword"},
            icon : {type : "text"},
          }}})
      }

      console.log(" 3 / 8 : creating mdblog_user index ....")
      if(await _check_index_exist("mdblog_user")){
          console.log("index already exists skipping....")
      }else{
          await client.indices.create({ index: 'mdblog_user'});
          console.log(" 4 / 8 : creating mdblog_user mapping ....")
          await client.indices.putMapping({ index: 'mdblog_user', body: { properties: {
            name: { type: 'text'},
            email: { type: 'text'},
            password: { type: 'text'}, // TODO
            register_time: { type: "date", format : "yyyy-MM-dd HH:mm:ss||yyyy-MM-dd||epoch_millis"},
            edit_count : {type : "integer"},
            is_admin : {type : "boolean"},
          }}})
      }

      console.log(" 5 / 8 : creating mdblog_usergroup index ....")
      if(await _check_index_exist("mdblog_usergroup")){
         console.log("index already exists")
      }else{
          await client.indices.create({ index: 'mdblog_usergroup'});
          
          console.log(" 6 / 8 : creating mdblog_usergroup mapping ....")
          await client.indices.putMapping({ index: 'mdblog_usergroup', body: { properties: {
            name: { type: 'text'},
            users: { type: 'keyword'},
          }}})
      }

      console.log(" 7 / 8 : creating mdblog_accesslog index ....")
      if(await _check_index_exist("mdblog_accesslog")){
          console.log("index already exists")
     }else{
      await client.indices.create({ index: 'mdblog_accesslog'});

      console.log(" 8 / 8 : creating mdblog_accesslog mapping ....")
      // await client.indices.putMapping({ index: 'mdblog_accesslog', body: { properties: {
      //   name: { type: 'text'},
      //   users: { type: 'keyword'},
      // }}})
     }
      console.log("All index created successfully !")
    }catch(err){
      console.log(err);
    }
  }

  // インデックスごと削除する
  async delete_all(){
      console.log("Deleting all index......");
      try{
        let res = await client.indices.delete({
          index: ['mdblog_user','mdblog_page', 'mdblog_usergroup', /*"mdblog_storage",*/ "mdblog_accesslog", /*"mdblog_history"*/],
          ignore:[404, 400]
        });
        console.log(res);
      }catch(err){
        console.log(err);
      }
      console.log("Deleting index done!");
  }

  // インデックス自体の削除はしないが中身は全削除
  async flush(){
    await client.deleteByQuery({ index: "mdblog_page", body: { query: { match_all: {} }}, ignore:[404]});
    await client.deleteByQuery({ index: "mdblog_user", body: { query: { match_all: {} }}, ignore:[404]});
    await client.deleteByQuery({ index: "mdblog_usergroup", body: { query: { match_all: {} }}, ignore:[404]});
    await client.deleteByQuery({ index: "accesslog", body: { query: { match_all: {} }}, ignore:[404]});
  }

  async insert_page(body){
    let body2 = body;
    if(config.general.url_type === "id"){ body2["url"] = Date.now(); }
    else {
      // titleの文字列をURLに指定する。?, &, <space> が入っているときは取り除く
      const url = (body?.title || "").replace("?", "").replace("&", "").replace(" ", "");
      if(url !== body?.title){ console.log("タイトルに不正な文字列が含まれています"); return false; }
      body2["url"] = url;
    }
    const res = await client.index({ index: 'mdblog_page', body:body2})
    await _reflesh_page();
    return res;
  }

  async _reflesh_page(){
    await client.indices.refresh({index: 'mdblog_page'})
  }

  async get_page_by_url(url){
    const res = await client.search({ index: 'mdblog_page',  body: { size : 1, query: { term: {url}}}, ignore:[404, 400] })
    if(res?.hits?.hits?.length > 0) { return res?.hits?.hits[0]; }
    return null; 
  }
 
  async update_page_content_by_url(url, content){
    const res = await client.updateByQuery({index:"mdblog_page", body:{
      query:{term:{url}},
      script:{inline:`ctx._source.content = \"${content.replaceAll("\"", "\\\"").replaceAll("\\", "\\\\")}\"` }
    }})
    return res;
  }
  
  async update_page_title_by_url(url, title){
    const res = await client.updateByQuery({index:"mdblog_page", body:{
      query:{term:{url}},
      script:{inline:`ctx._source.title = \"${title.replaceAll("\"", "\\\"").replaceAll("\\", "\\\\")}\"` }
    }})
    return res;
  }
  
  async delete_page_by_url(url){
    const res = await client.delete({index:"mdblog_page", body:{query:{term:{url}}}})
    return res;
  }


  async get_page_by_title(title){
      const res = await client.search({ index: 'mdblog_page',  body: { size : 1, query: { match: { title } } }  })
    if(res?.hits?.hits?.length > 0) { return res?.hits?.hits[0]; }
    return null; 
  }
  
  async get_page_by_id(id){
      const res = await client.search({ index: 'mdblog_page',  body: { size : 1, query: { match: { _id : id} } }  })
      if( res.hits.hits.length === 0) { return null; }
      return res.hits?.hits[0];
  }
  async custom_search(query){
    const res = await client.search({index:"mdblog_page", body:query});
    return res.hits?.hits;
  }

  // 検索に使われるパラメータ
  // q : 検索用語
  // p : page 1からスタート
  // n : 表示数
  // c : カテゴリー
  // ds : 投稿日のスタート（date start）
  // de : 投稿日のエンド(date end)

  // s : sort (0:デフォルト（検索語区順位）、d:日程, v:Visited, s:Stard, ) dr, vr, sr (reverse)がついたときには逆順
async custom_search_q(params){
  for(let i in params){ if(params.i === ""){ delete params.i; } }
  let search_query= {};
  const default_hit_size = 20;
  const max_hit_size = 50;
  search_query["size"] = Math.min(max_hit_size, params?.n || default_hit_size)
  search_query["from"] = (params?.page || 0) * search_query["size"];
  switch(params?.s){
    case "0": break;
    case "d":  search_query["sort"] = { "create_time": { "order": "desc" } }; break;
    case "dr": search_query["sort"] = { "create_time": { "order": "asec" } };break;
    case "v":  search_query["sort"] = { "view_count": { "order": "desc" } };break;
    case "vr": search_query["sort"] = { "view_count": { "order": "asec" } };break;
    case "s":  search_query["sort"] = { "lgtm_count": { "order": "desc" } };break;
    case "sr": search_query["sort"] = { "lgtm_count": { "order": "asec" } };break;
  }

   const default_search_query = {bool: {should:[], filter:[]}};
   search_query["query"] =default_search_query; 
   if("q" in params) search_query.query.bool.should.push({"match":{"title" : params.q}});
   if("c" in params) search_query.query.bool.filter.push({"match":{"tag" : params.c}});
   if("ds" in params) search_query.query.bool.filter.push({"range": {"create_time": {"gt": params.ds}}});
   if("de" in params) search_query.query.bool.filter.push({"range": {"create_time": {"lt": params.de}}});

   if(search_query.query.bool.should === [] && search_query.boolfilter === []) { 
     search_query["query"] ={"match_all":{}}; 
   }


  console.log("----------------------")
  console.log(search_query);

  const hits = await custom_search(search_query);
  const formatDate = (dt) => {
    try{
      var y = dt.getFullYear();
      var m = ('00' + (dt.getMonth()+1)).slice(-2);
      var d = ('00' + dt.getDate()).slice(-2);
      return (y + '-' + m + '-' + d);
    }catch{
      console.log("ERROR unkown datetime", dt)
      // logger.a_error("Unknown datetime --> 0000-00-00")
      return "0000-00-00"
    }
  }

  return hits.map(e => { return {
    title  : e._source?.title|| "",
    url  : e._source?.url || "",
    icon   : e._source?.icon || "",
//    user   : e._source?.user,
    c_date : formatDate(new Date(e._source?.create_time)),
    m_date : formatDate(new Date(e._source?.update_time)),
    edit_count : e._source?.edit_count || 0,
    lgtm_count : e._source?.lgtm_count || 0,
    content_short :e._source?.content.slice(50), 
    // content_short : e._source?.text_markdown.slice(10) || "no content",
    tag : e._source?.tag || []
  }});
}
async get_categories(pageid){
  const res = await client.search({index: "mdblog_page", body:{
    aggs: { category_count: { terms: { field : "tag.keyword", size: 500 }}}, size : 0 }});
  return res?.aggregations?.category_count?.buckets;
}


  async page_all(){
   const res = await client.search({index:"mdblog_page", body:{size:1000, query:{match_all:{}}}});
    return res?.hits?.hits || null;
  }

/*  ---------------------     [ SECTION ]  user configs  -------------------------    */

  async get_users(){
    const res = await client.search({index:"mdblog_user", body:{query:{match_all:{}}}});
    return res?.hits?.hits || null;
  }

  async is_admin_by_username(username){
      // res = await client.
      return true;
  }

  async is_admin_by_userid(userid){
      // res = await client.
      return true;
  }

  async get_users_by_group_id(group_id){
      return [];
  }

  async get_users_by_groupname(groupname){
      return [];
  }

  async is_user_in_group(user_id, group_id){
      return true;
  }

  async has_edit_right(page_id, username){
      return true;
  }

  async has_view_right(page_id, username){
      return true;
  }

  async register_user(username, password, is_admin=false){
    const exist_users = await get_user_by_username(username);
    if(exist_users){
       console.log(`User ${username} already exists`);
       return false;
    }

    const hash = await bcrypt.hash(password, config.backend.salt);
    if(! new RegExp(/^([a-zA-Z0-9]{4,100})$/).test(username)){
      console.log("invalid username  : " , username);
      return false;
    }
    const res = await client.index({index:"mdblog_user", body:{username, password:hash, register_time: Date.now(), is_admin, edit_count:0 }});
    return res;
  }

  async verify_user(username, password){
    const res = await client.search({index : "mdblog_user", body:{query:{match:{username}}}})
    if(! res?.hits?.hits){ return false; }
    if(res?.hits?.hits.length === 0) { return false; }
    const u = res.hits.hits[0]?._source;
    const cmp = await bcrypt.compare(password, u?.password.toString());
    return cmp;
  }

  async get_user_by_username(username){
    const res = await client.search({index : "mdblog_user", body:{query:{match:{username}}}})
    if(!res?.hits?.hits){return {}; }
    return res?.hits?.hits[0];
  }

async getPageID(page_title){
  const sql_query = "SELECT page_id FROM page WHERE page_title=?";
  const [results, fields, err] = await connection.query(sql_query, [page_title]);
  if (err){
    logger.a_error("Database Error : " + err);
  }
  if(results.length === 0){return ""}
  return results[0]["page_id"] || "";
}

async getUsergroupID(usergroup_name){
  const sql_query = "SELECT usergroup_id FROM usergroup WHERE usergroup_name=?";
  const [r, f, e] = await connection.query(sql_query, [usergroup_name]);
  if (e){
    logger.a_error("Database Error : " + err);
    return "";
  }
  if(r.length === 0){return "";}
  return r[0]["usergroup_id"]
}

