const express = require("express");
const router = express();
const { authenticate, authorize } = require("./../middlewares/auth");
const { hotelController } = require("./../controllers");
const { validate } = require("./../middlewares/validation");
const { hotelValidation } = require("./../validation");

router.post(
  "/",
  authenticate,
  authorize("Admin"),
  validate(hotelValidation.hotelSchema),
  hotelController.createHotel
);

module.exports = router;
