const joi = require("joi");
const CustomError = require("./../utils/customError");
exports.validate = (schema) => (req, res, next) => {
  const keys = Object.keys(schema);
  const object = keys.reduce((obj, key) => {
    if (Object.prototype.hasOwnProperty.call(req, key)) {
      obj[key] = req[key];
    }
    return obj;
  }, {});

  const { value, error } = joi.compile(schema).validate(object);
  if (error) {
    const errors = error.details.map((detail) => detail.message).join(", ");
    next(new CustomError(400, errors));
  }
  next();
};
