const jwt = require("jsonwebtoken");
const { jwtKey } = require("./utils");
function userMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(403).send("No token provided");
  }
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return res.status(500).send("Failed to authenticate");
    }
    if (decoded.role !== "user") {
      return res.status(403).send("Not a user");
    }
    req.user = decoded;
    next();
  });
}

module.exports = userMiddleware;
