const express = require("express");
const os = require("os");
const connectDB = require("../config/db");
const app = express();

const Job = require("./models/Job");

app.use(express.static("dist"));

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
  const { partTime, freelancer, searchText } = req.query;
  let jobs = [];
  let type = freelancer ? "Freelancer" : partTime ? "Part Time" : "Full Time";
  try {
    jobs = await Job.find({
      type,
      position: { $regex: searchText, $options: "i" },
    })
      .limit(10)
      .exec();
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


// Connect Database
connectDB();
app.listen(4000, () => console.log(`Listening on port 4000!`));
