const jwt = require("jsonwebtoken");
const config = require("./../config/config");
const { status } = require("http-status");
const CustomError = require("./../utils/customError");

exports.authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    throw new CustomError(status.UNAUTHORIZED, "Unauthorized");
  }
  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = decoded;
    next();
  } catch (err) {
    return new CustomError(status.UNAUTHORIZED, "Invalid token");
  }
};

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new CustomError(status.FORBIDDEN, "Forbidden");
    }
    next();
  };
};
