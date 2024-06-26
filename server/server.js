// server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.js";

dotenv.config();

const app = express();

app.use(express.json());

(async () => {
  const db = await connectDB();

  app.use("/api/auth", (req, res, next) => {
    req.db = db;
    next();
  }, authRoutes);

  app.use("/api/posts", (req, res, next) => {
    req.db = db;
    next();
  }, postRoutes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
})();
