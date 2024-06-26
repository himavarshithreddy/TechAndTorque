// controllers/authController.js
import jwt from "jsonwebtoken";
import { createUser, findUserByEmail } from "../models/user.js";
import { connectDB } from "../../config/db.js";
import bcrypt from "bcryptjs";

const db = await connectDB();

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await findUserByEmail(db, email);
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }
    const userId = await createUser(db, { name, email, password });
    const payload = {
      user: {
        id: userId,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    let user = await findUserByEmail(db, email);
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user._id,
      },
    };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
};
