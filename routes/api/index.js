const router = require("express").Router();
const plaaylistRoutes = require("./playlists");

router.use("/playlists", plaaylistRoutes);

module.exports = router;
