const router = require("express").Router();
const playlistController = require("../../controllers/playlist");

router
  .route("/")
  .get(playlistController.findAll)
  .post(playlistController.create);

router.route("/:id").delete(playlistController.remove);

module.exports = router;
