const register_user = async (username: string, password: string, is_admin: boolean = false) => {
  const exist_users = await get_user_by_username(username);
  if (exist_users) {
    console.log(`User ${username} already exists`);
    return false;
  }

  const hash = await bcrypt.hash(password, config.backend.salt);
  if (!new RegExp(/^([a-zA-Z0-9]{4,100})$/).test(username)) {
    console.log("invalid username  : ", username);
    return false;
  }
  const res = await client.index({ index: "mdblog_user", body: { username, password: hash, register_time: Date.now(), is_admin, edit_count: 0 } });
  return res;
}

export const verify_user = (username: string, password: any) => {
  const res = await client.search({ index: "mdblog_user", body: { query: { match: { username } } } })
  if (!res?.hits?.hits) { return false; }
  if (res?.hits?.hits.length === 0) { return false; }
  const u = res.hits.hits[0]?._source;
  const cmp = await bcrypt.compare(password, u?.password.toString());
  return cmp;
}

