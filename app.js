const express = require("express");
const app = express();
const { errorHandler, errorConvertor } = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.route");
const hotelRouter = require("./routes/hotel.route");
const { status } = require("http-status");
const CustomError = require("./utils/customError");
const morgan = require("./config/morgan");

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

app.use(express.json());
app.use(cookieParser());

//user routes
app.use("/auth", authRouter);
//hotel route
app.use("/hotel", hotelRouter);
//error handling routes
app.use((req, res, next) => {
  next(new CustomError(status.NOT_FOUND, "Not Found"));
});
app.use(errorConvertor);
app.use(errorHandler);

module.exports = app;
