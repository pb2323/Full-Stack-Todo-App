const User = require("../models/User");
const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
  try {
    console.log(
      req.headers.authorization
        ? req.headers.authorization
        : req.body.headers.Authorization
    );
    console.log(req.headers);
    const payload = await jwt.verify(
      req.headers.authorization
        ? req.headers.authorization
        : req.body.headers.Authorization,
      "Secret Key"
    );
    console.log(payload, "payload");
    const user = await User.findOne({ email: payload.email });
    console.log(user, "user");
    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
