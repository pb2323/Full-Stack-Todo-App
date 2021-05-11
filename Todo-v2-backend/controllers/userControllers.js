const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password, rememberMe } = req.body;
      console.log(email, password, rememberMe);
      const user = await User.findByEmailAndPassword(email, password);
      const passwordHashed = user.password;
      const token = await jwt.sign({ email, passwordHashed }, "Secret Key", {
        expiresIn: rememberMe ? 1000 * 60 * 60 * 24 * 365 : 1000 * 60 * 60 * 3,
      });
      return res.json({
        message: "Login successfull",
        status: 200,
        token: token,
        user: user,
      });
    } catch (err) {
      if (err === "Incorrect credentials")
        return res.status(404).send("Invalid credentials");
      return res.status(500).send("Internal Server Error");
    }
  },
  registerUser: async (req, res) => {
    try {
      const user = new User({ ...req.body });
      const token = await jwt.sign({ email, password }, "Secret Key", {
        expiresIn: 1000 * 60 * 60 * 3,
      });
      await user.save();
      return res.json({
        message: "Registration Successfull",
        status: 200,
        token,
      });
    } catch (err) {
      console.log(err.message);
      return res.status(500).send("Internal Server Error");
    }
  },
  logoutUser: async (req, res) => {
    try {
      localStorage.setItem(("token", null));
      return res.json({ message: "Logout Successfull", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
};
