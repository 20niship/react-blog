import * as mongo from "./utils/mongo";
const clamp = (x: number, min: number, max: number) => { return Math.max(Math.min(x, max), min); }

export const page_list = async (page: number = 0, n: number = 30) => {
  const page_ = clamp(page || 0, 0, 99999);
  const n_ = clamp(n || 20, 5, 50);
  console.log(page_, n_);
  return await mongo.page_list(page_, n_);
}

export const page_count = async () => {
  return await mongo.count_pages();
}

