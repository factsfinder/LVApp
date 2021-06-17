const mongoose = require("mongoose");
const db =
  "mongodb+srv://joblisting:vV8spiEdMcZaYy0G@lvcluster.bdqqe.mongodb.net/JobsDB?retryWrites=true&w=majority";
const Job = require("../server/models/Job");

const connectDB = async () => {
  try {
    console.log("Connecting to Database...");
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });
    let jobs = await Job.findOne();
    console.log("MongoDB Connected...", jobs);
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;
