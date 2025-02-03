const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  text: {
    typeof: String,
    requiered: true,
  },
  completed: {
    typeof: boolean,
    default: false,
  },
});

module.exports = mongoose.model("Todo", TodoSchema);
