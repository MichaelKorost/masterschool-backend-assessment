const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoritePhoto = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  url: String,
  description: String,
  username: String,
});

module.exports = mongoose.model("FavoritePhoto", favoritePhoto);
