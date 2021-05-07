const express = require("express");
const router = express.Router();

const userControllers = require("../controllers/userControllers");

router.post("/users/login", userControllers.loginUser);
router.post("/users/register", userControllers.registerUser);
router.post("/users/logout", userControllers.logoutUser);

module.exports = router;
