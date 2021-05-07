const User = require("../models/User");

const authenticate = async (req, res, next) => {
  try {
    const user = await User.findById(req.id);
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
