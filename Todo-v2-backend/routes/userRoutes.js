const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");

const userControllers = require("../controllers/userControllers");

router.post("/users/login", userControllers.loginUser);
router.post("/users/register", userControllers.registerUser);
router.post("/users/delete", authenticate, userControllers.deleteUser);

module.exports = router;
