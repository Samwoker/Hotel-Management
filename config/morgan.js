const morgan = require("morgan");
const fs = require("fs");
const path = require("path");

morgan.token("message", (req, res) => res.locals.errorMessage || "");
const getIpFormat = () => ":remote-addr -";
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "..", "logs/access.log"),
  { flags: "a" }
);

const successHandlerFormat = `${getIpFormat()} :method :url :status :response-time ms :user-agent :date`;
const errorHandlerFormat = `${getIpFormat()} :method :url :status :response-time ms :user-agent :date -error-message:message`;

const successHandler = morgan(successHandlerFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode >= 400,
});
const errorHandler = morgan(errorHandlerFormat, {
  stream: accessLogStream,
  skip: (req, res) => res.statusCode < 400,
});

module.exports = {
  successHandler,
  errorHandler,
};
