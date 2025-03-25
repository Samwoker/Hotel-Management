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
router.get("/", hotelController.getAllHotels);
router.get("/:id", hotelController.getHotel);
router.patch(
  "/:id",
  authenticate,
  authorize("Admin", "Staff"),
  validate(hotelValidation.hotelSchema),
  hotelController.updateHotel
);
router.delete(
  "/:id",
  authenticate,
  authorize("Admin"),
  hotelController.deleteHotel
);
router.get("/search", hotelController.searchHotel);
module.exports = router;
