const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blacklistSchema = new Schema({
  token: { type: String, required: true },
  createdAt: { type: Date, expires: "30d", default: Date.now },
});

module.exports = mongoose.model("Blacklist", blacklistSchema);
