const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const schema = new Schema({
  name: { type: String, lowercase: true, required: true },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: "Email address is required",
    validate: [validateEmail, "Please fill a valid email address"],
  },
  phone: { type: String, required: true },
  resumeUrl: { type: String, required: true }, // probably an s3 url.
});

var JobApplication = mongoose.model("JobApplication", schema);

module.exports = JobApplication;
