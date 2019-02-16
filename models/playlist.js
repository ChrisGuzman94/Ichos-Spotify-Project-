const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String },
  image: { type: String },
  link: { type: String }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
