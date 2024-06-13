// config/db.js
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

export async function connectDB() {
  try {
    await client.connect();
    console.log("MongoDB connected");
    return client.db("Blog");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}
