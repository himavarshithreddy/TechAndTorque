// models/post.js

export async function createNewPost(db, { title, content, userId }) {
    const result = await db.collection("posts").insertOne({
      title,
      content,
      userId,
      likes: [],
      createdAt: new Date(),
    });
    return result.insertedId;
  }
  
  export async function getPostss(db) {
    return await db.collection("posts").find({}).toArray();
  }
  
  export async function getPostById(db, postId) {
    return await db.collection("posts").findOne({ _id: new ObjectId(postId) });
  }
  