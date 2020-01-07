const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlaylistSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: { type: String, required: true },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Song",
      required: true
    }
  ],
  songNum: { type: Number, required: true }
});

const Playlist = mongoose.model("Playlist", PlaylistSchema);

module.exports = Playlist;
