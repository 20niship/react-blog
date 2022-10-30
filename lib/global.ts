export interface Page {
  _id : string,
  id: number,
  title: string,
  tag: string[],
  user: number,
  update: Date | string,
  create: Date | string,
  context: string,
  icon: string,
  lgbt: number,
  published: boolean
};

export interface User {
  _id ?: string,
  id : number,
  name : string,
  email : string,
  enabled : boolean,
  password ?: string, //TODO,
  register : Date | number,
  editcount : number,
  isadmin : boolean,
}

export interface Usergroup {
  _id ?: string,
  name : string,
  users: number[],
}

export enum DBResponseStatus {
  OK = 0,
  NotConnected = 1,
  NoItemRegistered = 2,
  NoImageRegistered = 3,
  InvalidTargetPrice = 4,
  InvalidTargetCompany = 5,
  ImageNotFound = 6,
  NotDefined = 7,
  InvalidInput = 8,
  OnlyOneIndex = 9,
}


export interface SearchResponse<HitType, TargetType> {
  status: DBResponseStatus,
  msg?: string, // status != okのときにここにエラーメッセージがくる
  hits: HitType,
  total?: number,
  time?: number,
  target: TargetType | undefined,
  query?: ItemSearchQuery
}

export enum ItemSearchMethod {
  All = 0,
  ImgContain = 1,
  ItemImage = 2,
  // ItemWord=3, //deprecated
  ItemTitleTfidf = 5,
  ItemDescTfidf = 6,
  ItemTitleDoc2vec = 8,
  ItemDescDoc2vec = 9,

  ItemDefault = 3,
  Keyword = 4,
  NotDefined = 7,
}

export interface ItemSearchQuery {
  target_id?: string,
  method: ItemSearchMethod,
  only_my_company?: boolean,
  keyword?: string,
  page: number,
  n: number,
  company?: string,
}

