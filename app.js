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
const applicantsRouter = require("./Routes/applicants.route.js");
const employeeRouter = require("./Routes/employees.route.js");
/* Set Middle wares  */
app.use(cors());
app.use(express.json());

/* Use Routes  */
app.use("/login", loginRouter);
app.use("/admin", adminRouter)
app.use("/hr", hrRouter)
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);
app.use("/applicants", applicantsRouter);
app.use("/", employeeRouter);


/* testing api  */
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./Views/index.html"));
});

/* not found routes */
app.use((req, res, next) => {
  res.status(404).send({ success: false, message: "Not Found Route" });
});

/* Server Error Routes */
app.use((err, req, res, next) => {
  res
    .status(500)
    .send({ success: false, message: "Something Broke of your API" });
});

module.exports = app;
