const { userService } = require(".");
const { status } = require("http-status");
const CustomError = require("./../utils/customError");

exports.login = async (req) => {
  const { email, password } = req.body;
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new CustomError(status.UNAUTHORIZED, "Invalid Credentials");
  }
  return user;
};
