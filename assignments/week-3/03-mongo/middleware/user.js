const { User } = require("../db");

function userMiddleware(req, res, next) {
  const userName = req.headers.username;
  const password = req.headers.password;
  User.findOne({ username: userName, password: password })
    .then((user) => {
      if (user) {
        next();
      } else {
        return res.status(403).send("Not a user");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
}

module.exports = userMiddleware;
