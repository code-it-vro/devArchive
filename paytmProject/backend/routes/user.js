const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User"); 
const JWT_SECRET = require("../config").JWT_SECRET; 

const router = express.Router();

const signupBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
  firstname: zod.string(),
  lastname: zod.string(),
});

router.post("/signup", async (req, res) => {
  try {
    const result = signupBody.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const user = await User.create({
      username: req.body.username,
      password: hashedPassword,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ message: "User created successfully", token });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

const signinBody = zod.object({
  username: zod.string().email(),
  password: zod.string(),
});

router.post("/signin", async (req, res) => {
  try {
    const result = signinBody.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ error: "Invalid request body" });
    }
    const user = await User.findOne({ username: req.body.username });
    if (user && (await bcrypt.compare(req.body.password, user.password))) {
      const token = jwt.sign({ userId: user._id }, JWT_SECRET);
      return res.json({ token });
    }
    res.status(400).json({ error: "Invalid username or password" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
