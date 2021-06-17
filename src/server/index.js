const express = require("express");
const os = require("os");
const bodyParser = require("body-parser");
const connectDB = require("../config/db");
const app = express();

const Job = require("./models/Job");
const JobApplication = require("./models/JobApplication");

app.use(express.static("dist"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/api/getUsername", (req, res) =>
  res.send({ username: os.userInfo().username })
);

// Todo: better error handling

// Todo: pagination
app.get("/api/getJobs", async (req, res) => {
  let allJobs = [];
  try {
    allJobs = await Job.find({}).limit(10).exec();
  } catch (err) {
    console.log("error getting job items: ", err);
  }
  res.send({ jobs: allJobs });
});

// Todo: pagination
app.get("/api/searchJobs", async (req, res) => {
  const { partTime, freelance, searchText, fullTime } = req.query;
  let jobs = [];
  const types = [
    freelance === "true" && "Freelancer",
    partTime === "true" && "Part Time",
    fullTime === "true" && "Full Time",
  ].filter((x) => x);
  const jobQuery = {
    position: { $regex: searchText, $options: "i" },
    type: { $in: types },
  };
  try {
    jobs = await Job.find(jobQuery).limit(10).exec();
  } catch (err) {
    console.log("error searching job items: ", err);
  }
  res.send({ jobs });
});

app.get("/api/getJobs", async (req, res) => {
  let allJobs = [];
  try {
    allJobs = await Job.find({}).limit(10).exec();
  } catch (err) {
    console.log("error getting job items: ", err);
  }
  res.send({ jobs: allJobs });
});

app.post("/api/job/apply", async (req, res) => {
  const { name, email, phone, resumeUrl } = req.body;
  let newApplication;
  try {
    const application = new JobApplication();
    application.name = name;
    application.email = email;
    application.phone = phone;
    application.resumeUrl = resumeUrl;
    newApplication = await application.save();
  } catch (err) {
    console.log("error applying for job:", err);
  }
  res.send({ application: newApplication });
});

// Connect Database
connectDB();
app.listen(4000, () => console.log(`Listening on port 4000!`));
