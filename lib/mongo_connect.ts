import mongoose from 'mongoose'

const MONGO_USER = "mongo";
const MONGO_PASSWORD = "mongoPass";
const MONGO_DBNAME = "example"
const MONGODB_URI = `mongodb://localhost:27017/`;

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

export default async function connect() {
  if (mongoose.connections[0].readyState) {
    return;
  }
  try {
    await mongoose.connect(MONGODB_URI, {
      auth: { authSource: "admin" },
      user: MONGO_USER,
      pass: MONGO_PASSWORD,
      bufferCommands: false,
      dbName: MONGO_DBNAME,
      // useUnifiedTopology: true,
      // useFindAndModify: false,
      // useCreateIndex: true,
      // useNewUrlParser: true
    })
  } catch (e) {
    console.error("Failed to Connect Mongodb ")
    console.log(e);
    process.exit()
  }
}
