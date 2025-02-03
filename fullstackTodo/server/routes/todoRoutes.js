require('dotenv').config()
const express = require("express");
const Todo = require("../models/todo.js");
const router = express.Router();

router.get("/", (req, res) => {
  try {
    const todos = Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.post("/", (req, res) => {
  const todo = new Todo({
    text: req.body.text,
  });
  try {
    const newTodo = todo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        text: req.body.text,
      },
      { new: true }
    );
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({
      message: "Todo Deleted",
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
