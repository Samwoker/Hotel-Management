const express = require("express");
const router = express.Router();
const { authController } = require("./../controllers");
const { validate } = require("./../middlewares/validation");
const { userValidation } = require("./../validation");

router.post(
  "/signup",
  validate(userValidation.createUserSchema),
  authController.signUp
);
router.post(
  "/login",
  validate(userValidation.loginSchema),
  authController.login
);

module.exports = router;
