const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../middleware/utils");

// Admin Routes
router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    let admin = await Admin.findOne({ username: body["username"] });
    if (admin) {
      return res.status(400).send("admin already exists");
    }

    const newAdmin = new Admin({
      username: body["username"],
      password: body["password"],
    });
    admin = await newAdmin.save();
    return res.status(201).send("admin created successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  try {
    const admin = await Admin.findOne({
      username: body["username"],
      password: body["password"],
    });
    if (admin) {
      const jwtToken = jwt.sign(
        { username: body["username"], role: "admin" },
        jwtKey
      );
      return res.status(200).json({ token: jwtToken });
    } else {
      return res.status(403).send("invalid credentials");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post("/courses", adminMiddleware, (req, res) => {
  const body = req.body;
  const newCourse = new Course({
    title: body["title"],
    description: body["description"],
    price: body["price"],
    imageLink: body["imageLink"],
  });

  newCourse
    .save()
    .then((course) => {
      return res.status(201).send({ message: "Course created successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.get("/courses", adminMiddleware, (req, res) => {
  Course.find()
    .then((courses) => {
      return res.status(200).send(courses);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

module.exports = router;
