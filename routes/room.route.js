const express = require("express");
const router = express.Router();
const { authenticate, authorize } = require("./../middlewares/auth");
const validate = require("./../middlewares/validation");
const { roomController } = require("./../controllers");
const { roomValidation } = require("./../validation");

router.post(
  "/",
  authenticate,
  authorize("Admin"),
  validate(roomValidation.roomSchema),
  roomController.createRoom
);

module.exports = router;
