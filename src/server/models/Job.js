const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  position: { type: String },
  location: { type: String },
  company: { type: String },
  logo: { type: String },
  type: { type: String },
  experience: { type: String },
  skills: { type: [String] },
});

var Job = mongoose.model("Job", schema);

module.exports = Job;
