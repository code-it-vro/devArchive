const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGO_DB_URL);

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    unique: true,
    maxLength: 30,
  },
  password: { type: String, required: true, trim: true , minLength: 6},
  firstname: { type: String, required: true, trim: true },
  lastname: { type: String, required: true, trim: true },
});

const accountSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  balance: {
    type: Number,
    required: true,
  },
});

const Account = mongoose.model("Account", accountSchema);

const User = mongoose.model("User", userSchema);
module.exports = { User, Account };
