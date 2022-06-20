const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    phoneNumber: { type: String, trim: true },
    name: { type: String, trim: true, require: [true, "name is required"] },
    email: { type: String, trim: true, require: [true, "emnail is required"] },
    DOB: { type: String, trim: true, require: [true, "DOB is required"] },
    gender: { type: String, trim: true, require: [true, "gender is required"] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
