// import mongoose from 'mongoose'

// const MONGODB_URL = process.env.MONGODB_URL!;

// if(!MONGODB_URL){
//     throw new Error("MONGODB_URL not defined");
// }

// interface MongooseCache {
//   conn: mongoose.Connection | null;
//   promise: Promise<mongoose.Connection> | null;
// }

// declare global {
//   var mongoose: MongooseCache;
// }

// let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function connectToDatabase() {
//   if (cached.conn) {
//     console.log("cached connection...")
//     return cached.conn;
//   }
  
//   if (!cached.promise) {
//     console.log("connecting again and again...")
//     cached.promise = mongoose.connect(MONGODB_URL).then(() => {
//       return mongoose.connection;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default connectToDatabase;

import mongoose from 'mongoose'
const MONGODB_URL = process.env.MONGODB_URL!

if (!MONGODB_URL) {
  throw new Error('MONGODB_URL not defined')
}
let isConnected = false // Track the connection status

export default async function connectToDatabase () {
  if (isConnected) return

  try {
    await mongoose.connect(MONGODB_URL)
    isConnected = true
    console.log('Connected to MongoDB')
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error)
    throw error
  }
}
