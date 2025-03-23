const catchAsync = require("./../utils/catchAsync");
const { status } = require("http-status");
const { userService, tokenService ,authService} = require("./../services");

exports.signUp = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const token = tokenService.generateToken(user._id, user.role);
  res.status(status.CREATED).json({ user, token });
});
exports.login = catchAsync(async (req, res) => {
  const user = await authService.login(req);
  const token = tokenService.generateToken(user._id, user.role);
  res.status(status.OK).json({ user, token });
});
