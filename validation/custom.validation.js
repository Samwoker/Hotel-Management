const validator = require("validator");

exports.password = (value, helper) => {
  if (!validator.isStrongPassword(value)) {
    return helper.message("password is weak");
  }
};
