const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports = {
  loginUser: async (req, res) => {
    try {
      const { email, password, rememberMe } = req.body;
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
      console.log(err);
      if (err === "Incorrect credentials")
        return res.status(404).send("Invalid credentials");
      else if (err === "User doesnot exist") return res.status(404).send(err);
      return res.status(500).send("Internal Server Error");
    }
  },
  registerUser: async (req, res) => {
    try {
      const { email, password, name } = req.body;
      const user = new User({ ...req.body });
      await user.save();
      const updatedUser = await User.findOne({ email: email });
      console.log(updatedUser, "updatedUser");
      const updatedEmail = updatedUser.email,
        updatedPassword = updatedUser.password;
      const token = await jwt.sign(
        { email: updatedEmail, password: updatedPassword },
        "Secret Key",
        {
          expiresIn: 1000 * 60 * 60 * 3,
        }
      );
      console.log(token, "registration token");
      const payload = await jwt.verify(token, "Secret Key");
      console.log(payload, "payload");
      console.log(updatedEmail, updatedPassword);
      return res.json({
        message: "Registration Successfull",
        status: 200,
        token,
        user: updatedUser,
      });
    } catch (err) {
      console.log(err.message);
      if (err.message.slice(0, 37) === "E11000 duplicate key error collection")
        return res.status(400).send("Email already exists");
      return res.status(500).send("Internal Server Error");
    }
  },
  deleteUser: async (req, res) => {
    try {
      const user = req.user;
      await user.remove();
      // const user=await User.findById(user._id);
      // console.log(user);
      return res.json({ message: "User removed successfully", status: 200 });
    } catch (err) {
      return res.status(500).send("Internal Server Error");
    }
  },
};
