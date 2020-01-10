const router = require("express").Router();
const loginController = require("../../controllers/loginController");

// Matches with "/api/login"
router.route("/").get(loginController.client);

module.exports = router;
