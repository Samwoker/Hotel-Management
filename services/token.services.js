const jwt = require("jsonwebtoken");
const dayjs = require("dayjs");
const config = require("./../config/config");

exports.generateToken = (userId, role) => {
  const payload = {
    sub: userId,
    iat: dayjs().unix(),
    role,
  };
  const token = jwt.sign(payload, config.jwt.secret);
  return token;
};
