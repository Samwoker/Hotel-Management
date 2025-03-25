const catchAsync = require("./../utils/catchAsync");
const { status } = require("http-status");
const { hotelService } = require("./../services");

exports.createHotel = catchAsync(async (req, res) => {
  const hotel = await hotelService.createHotel(req.body);
  res.status(status.CREATED).json({ hotel });
});
exports.getAllHotels = catchAsync(async (req, res) => {
  const hotels = await hotelService.getAllHotels();
  res.status(status.OK).json({ hotels });
});
exports.getHotel = catchAsync(async (req, res) => {
  const id = req.params.id;
  const hotel = await hotelService.getHotel(id);
  res.status(status.OK).json({ hotel });
});
exports.updateHotel = catchAsync(async (req, res) => {
  const id = req.params.id;
  const updateData = req.body;
  const updatedHotel = await hotelService.updateHotel(id, updateData);
  res.status(status.OK).json({ updatedHotel });
});
exports.deleteHotel = catchAsync(async (req, res) => {
  const id = req.params.id;
  const hotel = await hotelService.deleteHotel(id);
  res.status(status.OK).json({ message: `Hotel deleted successfully`, hotel });
});
exports.searchHotel = catchAsync(async (req, res) => {
  const name = req.query.name;
  const hotel = await hotelService.searchHotel(name);
  res.status(status.OK).json({ hotel });
});
exports.getHotelByRating = catchAsync(async (req, res) => {
  const rating = req.params.rating;
  const hotel = await hotelService.getHotelByRating(rating);
  res.status(status.OK).json({ hotel });
});
