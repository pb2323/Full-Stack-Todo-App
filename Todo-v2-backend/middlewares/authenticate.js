const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    const payload = await jwt.verify(req.headers.authorization, "Secret Key");
    const user = await User.findOne({ email: payload.email });
    console.log(user);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
