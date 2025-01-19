const express = require("express");
const zod = require("zod");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../db");
const JWT_SECRET = require("../config").JWT_SECRET;
const authMiddleware = require("../middleware"); 

const router = express.Router();

// Signup Body Validation
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

// Signin Body Validation
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

// Update User Information
const updateBody = zod.object({
  password: zod.string().optional(),
  firstname: zod.string().optional(),
  lastname: zod.string().optional(),
});

router.put("/", authMiddleware, async (req, res) => {
  const { success, error } = updateBody.safeParse(req.body);
  if (!success) {
    return res.status(400).json({
      message: "Error while updating information",
      error: error.errors,
    });
  }

  await User.updateOne({ _id: req.userId }, { $set: req.body });
  res.json({ message: "Updated successfully" });
});

// Bulk User Fetch with Filter
router.get("/bulk", async (req, res) => {
  const filter = req.query.filter || "";

  const users = await User.find({
    $or: [
      {
        firstname: { $regex: filter, $options: "i" },
        lastname: { $regex: filter, $options: "i" },
      },
    ],
  });

  res.json({
    users: users.map((user) => ({
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      _id: user._id,
    })),
  });
});

module.exports = router;
