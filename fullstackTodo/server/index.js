require("dotenv").config();
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todoRoutes");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => console.log(err));

app.use("/api/todos", todoRoutes);

app.listen(5000, () => {
  console.log("server running on port 5000");
});
