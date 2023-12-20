const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const jwt = require("jsonwebtoken");
const { jwtKey } = require("../middleware/utils");

// User Routes
router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    let user = await User.findOne({ username: body["username"] });
    if (user) {
      return res.status(400).send("user already exists");
    }

    const newUser = new User({
      username: body["username"],
      password: body["password"],
    });
    user = await newUser.save();
    return res.status(201).send("user created successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.post("/signin", async (req, res) => {
  const body = req.body;
  try {
    const user = await User.findOne({
      username: body["username"],
      password: body["password"],
    });
    if (user) {
      const jwtToken = jwt.sign(
        { username: body["username"], role: "user" },
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

router.get("/courses", (req, res) => {
  Course.find({})
    .then((courses) => {
      return res.status(200).send({ courses: courses });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  const courseId = req.params.courseId;

  try {
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("course with given not found");
    }
  } catch (err) {
    console.log(err);
    return res.status(500).send();
  }

  User.findOneAndUpdate(
    { username: req.user?.username },
    { $push: { purchasedCourses: courseId } }
  )
    .then((user) => {
      return res.status(200).send({ message: "Course purchased successfully" });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

router.get("/purchasedCourses", userMiddleware, (req, res) => {
  console.log(req.user.username);
  User.findOne({ username: req.user?.username })
    .populate("purchasedCourses")
    .then((user) => {
      console.log(user);
      return res.status(200).send({ purchasedCourses: user.purchasedCourses });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

module.exports = router;
