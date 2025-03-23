const mongoose = require("mongoose");
const { status } = require("http-status");
const CustomError = require("./../utils/customError");

exports.errorConvertor = (err, req, res, next) => {
  let error = err;
  if (!error instanceof CustomError) {
    statusCode =
      error.statusCode & (typeof error.statusCode === "number")
        ? error.statusCode
        : error instanceof mongoose.Error
        ? status.BAD_REQUEST
        : status.INTERNAL_SERVER_ERROR;
    message = error.message || status[statusCode];
    error = new CustomError(statusCode, message, false, err.stack);
  }
  next(error);
};
exports.errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = statusCode || 500;
  message = message || "Internal Server Error"
  const response = {
    error: true,
    code: statusCode,
    message,
    ...{ stack: err.stack },
  };
  res.locals.errorMessage = message;
  res.status(statusCode).send(response);
  next();
};
