import mongoose from 'mongoose'

const mongo_pagename = "mongo";
const mongo_pass = "mongoPass";
const authMechanism = "DEFAULT";
const dbname = "example"
const MONGODB_URI = `mongodb://${mongo_pagename}:${mongo_pass}@localhost:27017/${dbname}?authMechanism=${authMechanism}`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

let cached = global.mongoose
if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

export default async function connect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true
    }

    // cached.promise = mongoose.connect(MONGODB_URI, opts).then(mongoose => {
    //   return mongoose
    // })
    mongoose.connect(MONGODB_URI);
  }
  cached.conn = await cached.promise
  return cached.conn
}
