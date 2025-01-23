const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  address: { type: String, required: true, unique: true },
  nickname: { type: String, required: true },
  avatar: { type: String, required: true },
  referralQR: { type: String, required: true },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
