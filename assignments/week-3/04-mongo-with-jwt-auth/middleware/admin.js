const jwt = require("jsonwebtoken");
const { jwtKey } = require("./utils");

function adminMiddleware(req, res, next) {
  const token = req.headers["authorization"];
  console.log(token);
  if (!token) {
    return res.status(403).send("No token provided");
  }
  jwt.verify(token, jwtKey, (err, decoded) => {
    if (err) {
      return res.status(500).send("Failed to authenticate");
    }
    if (decoded.role !== "admin") {
      return res.status(403).send("Not an admin");
    }
    req.user = decoded;
    next();
  });
}

module.exports = adminMiddleware;
