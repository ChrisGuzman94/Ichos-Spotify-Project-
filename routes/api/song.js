const router = require("express").Router();
const songController = require("../../controllers/songController");

// Matches with "/api/books"
router
  .route("/")
  .get(songController.findAll)
  .post(songController.create);

// Matches with "/api/books/:id"
router
  .route("/:id")
  .get(songController.findById)
  .put(songController.update)
  .delete(songController.remove);

module.exports = router;
