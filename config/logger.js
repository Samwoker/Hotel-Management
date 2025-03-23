const winston = require("winston");
const { createLogger, format, transports } = winston;
const { combine, timestamp, label, printf } = format;

const myFormat = printf(({ level, message, stack, timestamp }) => {
  return `${timestamp} : ${level} : ${message || stack}`;
});

const logger = createLogger({
  level: "debug",
  format: combine(timestamp(), myFormat),
  transports: [new transports.Console()],
});

module.exports = logger;
