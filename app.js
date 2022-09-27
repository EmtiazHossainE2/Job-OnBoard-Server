/* Init Server  */
const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");

const app = express();

//Routes
const loginRouter = require("./Routes/login.route.js");
const adminRouter = require("./Routes/admin.route.js");
const hrRouter = require("./Routes/hr.route.js");
const usersRouter = require("./Routes/users.route.js");
const jobsRouter = require("./Routes/jobs.route.js");
const applicantsRouter = require("./Routes/applicants.route");
const blogsRouter = require("./Routes/blogs.route.js");
const employeeRouter = require("./Routes/employees.route.js");
const hrTaskRouter = require("./Routes/hrTask.route");
const submittedTaskRouter = require("./Routes/submittedTask.route");
const guestEmail = require("./Routes/guestEmail.route");

/* Set Middle wares  */
app.use(cors());
app.use(express.json());

/* Use Routes  */
app.use("/login", loginRouter);
app.use("/admin", adminRouter);
app.use("/hr", hrRouter);
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);
app.use("/applicants", applicantsRouter);
app.use("/guestEmail", guestEmail);
app.use("/", employeeRouter);
app.use("/", blogsRouter);
app.use("/", hrTaskRouter);
app.use("/", submittedTaskRouter);

/* testing api  */
app.get('/', (req, res) => {
  res.send('Server is running')
})

/* not found routes */
app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "Not Route Found " });
});

/* Server Error Routes */
app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ success: false, message: "Something Broke of your API" });
});

module.exports = app;
