const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");

// - POST /users/signup
//   Description: Creates a new user account.
//   Input: { username: 'user', password: 'pass' }
//   Output: { message: 'User created successfully' }

// User Routes
router.post("/signup", async (req, res) => {
  const body = req.body;
  try {
    let user = await User.findOne({ username: body["username"] });
    if (user) {
      return res.status(400).send("User already exists");
    }

    const newUser = new User({
      username: body["username"],
      password: body["password"],
    });
    user = await newUser.save();
    return res.status(201).send("User created successfully");
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

// - GET /users/courses
//   Description: Lists all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

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

// - POST /users/courses/:courseId
//   Description: Purchases a course. courseId in the URL path should be replaced with the ID of the course to be purchased.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { message: 'Course purchased successfully' }
// - GET /users/purchasedCourses
//   Description: Lists all the courses purchased by the user.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { purchasedCourses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

router.post("/courses/:courseId", userMiddleware, (req, res) => {
  const courseId = req.params.courseId;
  User.findOneAndUpdate(
    { username: req.headers.username },
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
  User.findOne({ username: req.headers?.username })
    .populate("purchasedCourses")
    .then((user) => {
      return res.status(200).send({ purchasedCourses: user.purchasedCourses });
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).send();
    });
});

module.exports = router;
