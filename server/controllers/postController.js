// controllers/postController.js
import { createNewPost, getPostss } from "../models/posts.js";

export const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const postId = await createNewPost(req.db, { title, content, userId: req.user.id });
    res.json({ postId });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await getPostss(req.db);
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
