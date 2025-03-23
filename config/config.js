require("dotenv").config();
const { envValidation } = require("./../validation");
const { value: envVars, error } = envValidation.validate(process.env);
const logger = require("./logger");
if (error) {
  logger.error(error);
}
module.exports = {
  port: envVars.PORT,
  mongo_uri: envVars.MONGO_URI,
  jwt: {
    secret: envVars.JWT_SECRET,
  },
};
