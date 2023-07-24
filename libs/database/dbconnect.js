import mongoose from "mongoose";

var MONGODB_URI = "";
// if (process.env.NODE_ENV == "development") {
// MONGODB_URI = "mongodb://localhost:27017/bizgpt";
// } else {
MONGODB_URI = "mongodb://aditya:mongodbaditya1234@62.72.6.101:27017/24justice";
// }
// mongoose.set("strictQuery", false);
// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
