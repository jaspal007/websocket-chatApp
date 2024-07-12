
import mongoose from "mongoose";
import { Server } from "socket.io";

export async function initMongoose() {
  if (mongoose.connection?.readyState === 1) {
    console.log('previous connection re-established');
    return mongoose.connection.asPromise();
  }
  console.log('database connected successfully');
  return mongoose.connect(process.env.MONGODB_URL);
}