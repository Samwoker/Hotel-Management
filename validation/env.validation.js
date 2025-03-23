const joi = require("joi");

const envSchema = joi
  .object({
    PORT: joi.number().positive().default(3000),
    MONGO_URI: joi.string().required(),
  })
  .unknown();

module.exports = envSchema;
