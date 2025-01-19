require("dotenv").config();

module.exports = {
  JWT_SECRET: process.env.JWT_SECRET, // Make sure the variable is defined in .env
};
