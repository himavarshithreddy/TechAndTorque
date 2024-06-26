// routes/post.js
import express from "express";
import auth from "../middleware/auth.js";
import { createPost, getPosts } from "../controllers/postController.js";

const router = express.Router();

router.post("/", auth, createPost);
router.get("/", getPosts);

export default router;
