const router = require("express").Router();
const playlistRoutes = require("./playlists");

router.use("/playlists", playlistRoutes);

module.exports = router;
