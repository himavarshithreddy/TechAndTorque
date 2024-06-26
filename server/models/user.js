// models/user.js
import bcrypt from "bcryptjs";

export async function createUser(db, { name, email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.collection("users").insertOne({
    name,
    email,
    password: hashedPassword,
    bookmarks: [],
    likes: [],
  });
  return result.insertedId;
}

export async function findUserByEmail(db, email) {
  return await db.collection("users").findOne({ email });
}
