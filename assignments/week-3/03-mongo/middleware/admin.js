const { Admin } = require("../db");

function adminMiddleware(req, res, next) {
  const userName = req.headers.username;
  const password = req.headers.password;
  Admin.findOne({ username: userName, password: password })
    .then((admin) => {
      if (admin) {
        next();
      } else {
        return res.status(403).send("Not an admin");
      }
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
}

module.exports = adminMiddleware;
