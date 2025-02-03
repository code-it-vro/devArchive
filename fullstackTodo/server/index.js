require("dorenv").config();
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
    app.listen(process.env.PORT, () => {
      console.log(`Server started on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));

app.use("/api/todos", todoRoutes);
