const catchAsync = require("./../utils/catchAsync");
const { status } = require("http-status");
const { hotelService } = require("./../services");

exports.createHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.createHotel(req);
  res.status(status.CREATED).json({ hotel });
});
