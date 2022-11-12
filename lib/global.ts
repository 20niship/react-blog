export const ViewStatus = { Published: 0, Draft: 1, Deleted: 2, Editing: 3 } as const;
export type ViewStatuses = typeof ViewStatus[keyof typeof ViewStatus];

export interface Post {
  _id: any,
  title: string,
  tags: string[],
  user: number,
  update: Date | string,
  create: Date | string,
  context: string,
  icon: string,
  status: ViewStatuses
  lgtm: number,
  viewcount: number,
};

export interface User {
  _id: string,
  name: string,
  email: string,
  enabled: boolean,
  password?: string, //TODO,
  register: Date | number,
  editcount: number,
  isadmin: boolean,
}

export interface Usergroup {
  _id?: string,
  name: string,
  users: number[],
}

export interface Comment {
  _id: string,
  id: number,
  author: string,
  email: string,
  status: ViewStatuses,
  title: string,
  context: string,
  timestamp: Date | string,
}

export interface Media {
  _id: string,
  src: string,
  alt: string,
  page_id: string
}

