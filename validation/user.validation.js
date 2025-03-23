const { password } = require("./custom.validation");
const joi = require("joi");
exports.createUserSchema = {
  body: joi.object().keys({
    username: joi.string().required().min(3).max(30),
    email: joi.string().required().email(),
    password: joi.string().required().custom(password),
    role: joi.string().valid("Guest", "Admin", "Staff").default("Guest"),
    profilePicture: joi.string().uri().optional(),
    phone: joi.string(),
    preferences: joi.object().pattern(joi.string(), joi.string()).optional(),
    isActive: joi.boolean().optional(),
    lastLogin: joi.date().optional(),
    createdAt: joi.date().optional(),
    updatedAt: joi.date().optional(),
  }),
};
exports.loginSchema = {
  body: joi.object().keys({
    email: joi.string().required().email(),
    password: joi.string().required(),
  }),
};
