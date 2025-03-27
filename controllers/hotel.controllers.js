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
exports.getHotelByCity = catchAsync(async (req, res) => {
  const city = req.params.city;
  const hotel = await hotelService.getHotelByCity(city);
  res.status(status.OK).json({ hotel });
});
exports.uploadImage = catchAsync(async (req, res) => {
  const id = req.params.id;
  const hotel = await hotelService.uploadImage(id, req.files);
  res.status(status.OK).json({ hotel });
});
exports.getHotelNearby = catchAsync(async (req, res) => {
  const { longitude, latitude, maxDistance } = req.query;
  if (!longitude || !latitude) {
    throw new CustomError(
      status.BAD_REQUEST,
      "Please provide longitude and latitude"
    );
  }
  const hotels = await hotelService.getHotelNearby(
    parseFloat(longitude),
    parseFloat(latitude),
    parseInt(maxDistance) || 5000
  );
  res.status(status.OK).json({ hotels });
});
exports.updateAmenities = catchAsync(async (req, res) => {
  const id = req.params.id;
  const {amenities} = req.body;
  const hotel = await hotelService.updateAmenities(id,amenities);
  res.status(status.OK).json({ hotel });
});
