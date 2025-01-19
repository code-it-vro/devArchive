const express = require("express");
const cors = require("cors");

const mainRouter = require("./routes/index.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", mainRouter);
app.get("/api/v1/test", (req, res) => {
  res.status(200).json({ message: "API is working" });
});
app.listen(3000, () => console.log("Server started on port 3000"));
