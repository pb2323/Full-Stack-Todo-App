const User = require("../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByEmailAndPassword(email, password);
      await user.save();
      return res.json({ message: "Login successfull", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
  registerUser: async (req, res) => {
    try {
      const user = new User({ ...req.body });
      await user.save();
      return res.json({ message: "Registration Successfull", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
  logoutUser: async (req, res) => {
    try {
      return res.json({ message: "Logout Successfull", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
};
