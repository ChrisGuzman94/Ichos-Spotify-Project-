const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const playlistSchema = new Schema({
  name: { type: String },
  img: { type: String },
  link: { type: String }
});

const Playlist = mongoose.model("Playlist", playlistSchema);

module.exports = Playlist;
