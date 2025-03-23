const app = require("./app");
const mongoose = require("mongoose");
const http = require("http");
const config = require("./config/config");
const logger = require("./config/logger");

const httpServer = http.createServer(app);

mongoose
  .connect(config.mongo_uri)
  .then(() => {
    logger.info("db connected successfully");
  })
  .catch((err) => {
    logger.error("db connection failed", err);
  });

const server = httpServer.listen(config.port, () => {
  logger.info(`server connected on port ${config.port}`);
});
