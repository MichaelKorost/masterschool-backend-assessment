const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: { type: String, required: [true, "Username is Required"] },
    password: { type: String, required: [true, "Password is Required"] },
    email: {
      type: String,
      required: [true, "Email is Required"],
      unique: [true, "Email already exists"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
