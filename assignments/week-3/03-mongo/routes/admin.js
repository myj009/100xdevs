const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Course } = require("../db");

// Admin Routes

// - POST /admin/signup
//   Description: Creates a new admin account.
//   Input Body: { username: 'admin', password: 'pass' }
//   Output: { message: 'Admin created successfully' }

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
    return res.status(500).send();
  }
});

// - POST /admin/courses
//   Description: Creates a new course.
//   Input: Headers: { 'username': 'username', 'password': 'password' }, Body: { title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com' }
//   Output: { message: 'Course created successfully', courseId: "new course id" }

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

// - GET /admin/courses
//   Description: Returns all the courses.
//   Input: Headers: { 'username': 'username', 'password': 'password' }
//   Output: { courses: [ { id: 1, title: 'course title', description: 'course description', price: 100, imageLink: 'https://linktoimage.com', published: true }, ... ] }

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
