// server.js
import express from "express";
import dotenv from "dotenv";
import { connectDB } from "../config/db.js";


dotenv.config();

const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());

// Routes


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
