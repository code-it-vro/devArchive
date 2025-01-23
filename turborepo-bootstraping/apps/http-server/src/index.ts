import express from "express";

const app = express();

app.get("/signup", (req, res) => {
  res.send("Welcome to the signup page");
});
app.get("/signin", (req, res) => {
  res.send("Welcome to the signin page");
});
app.get("/chat", (req, res) => {
  res.send("Welcome to the chat page");
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
