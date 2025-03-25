const express = require("express");
const router = express();
const { authenticate, authorize } = require("./../middlewares/auth");
const { hotelController } = require("./../controllers");
const { validate } = require("./../middlewares/validation");
const { hotelValidation } = require("./../validation");
const upload = require("./../middlewares/upload");

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
router.get("/star-rating/:rating", hotelController.getHotelByRating);
router.get("/city/:city", hotelController.getHotelByCity);
router.post(
  "/:id/images",
  authenticate,
  authorize("Admin"),
  upload.array("images", 10),
  hotelController.uploadImage
);
router.get("/nearby", hotelController.getHotelNearby);
module.exports = router;
