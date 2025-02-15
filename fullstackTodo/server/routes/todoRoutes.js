require("dotenv").config();
const express = require("express");
const Todo = require("../models/todo.js");
const router = express.Router();

// GET all todos
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST (Create a new todo)
router.post("/", async (req, res) => {
  try {
    const todo = new Todo({ text: req.body.text });
    const newTodo = await todo.save(); // FIXED: added await
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT (Update a todo)
router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { text: req.body.text },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE (Remove a todo)
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Todo Deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
