const { JWT_SECRET } = require("./config");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

  try {
    const decode = jwt.verify(token, JWT_SECRET);
    req.userId = decode.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = authMiddleware;
