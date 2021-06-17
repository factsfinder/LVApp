const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  name: { type: String },
  email: { type: String },
  phone: { type: String },
  resume: { type: String }, // url
});

var User = mongoose.model("User", schema);

module.exports = User;
