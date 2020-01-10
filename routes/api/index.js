const path = require("path");
const router = require("express").Router();
const songRoutes = require("./song");
const login = require("./login");

//
router.use("/songs", songRoutes);

router.use("/login", login);

// For anything else, render the html page
router.use(function(req, res) {
  res.sendFile(path.join(__dirname, "../../client/build/index.html"));
});

module.exports = router;
