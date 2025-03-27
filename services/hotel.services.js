const { description, id } = require("../validation/env.validation");
const Hotel = require("./../models/hotel.model");
const CustomError = require("./../utils/customError");
const { status } = require("http-status");

exports.createHotel = async (body) => {
  const hotel = await Hotel.create(body);
  return hotel;
};
exports.getAllHotels = async () => {
  const hotels = await Hotel.find({});
  if (!hotels) throw new CustomError(status.NOT_FOUND, "No hotels found");
  return hotels;
};
exports.getHotel = async (id) => {
  const hotel = await Hotel.findById(id);
  if (!hotel) throw new CustomError(status.NOT_FOUND, "Hotel not found");
  return hotel;
};
exports.updateHotel = async (id, updateData) => {
  const updatedHotel = await Hotel.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });
  if (!updatedHotel) throw new CustomError(status.NOT_FOUND, "Hotel not found");
  return updatedHotel;
};
exports.deleteHotel = async (id) => {
  const hotel = await Hotel.findByIdAndDelete(id);
  if (!hotel) throw new CustomError(status.NOT_FOUND, "Hotel Not Found");
  return hotel;
};
exports.searchHotel = async (name) => {
  const hotel = await Hotel.findOne({ name });
  if (!hotel) throw new CustomError(status.NOT_FOUND, "Hotel not found");
  return hotel;
};
exports.getHotelByRating = async (starRating) => {
  const hotel = await Hotel.find({ starRating });
  if (!hotel) throw new CustomError(status.NOT_FOUND, "Hotel not found");
  return hotel;
};
exports.getHotelByCity = async (city) => {
  const hotel = await Hotel.find({ "location.city": city });
  if (!hotel) throw new CustomError(status.NOT_FOUND, "Hotel not found");
  return hotel;
};
exports.uploadImage = async (id, files) => {
  const hotel = await Hotel.findById(id);
  if (!hotel) throw new CustomError(status.NOT_FOUND, "Hotel not found");
  const filePaths = files.map((file) => file.path);
  hotel.images = filePaths;
  await hotel.save();
  return hotel;
};
exports.getHotelNearby = async (longitude, latitude, maxDistance = 5000) => {
  const hotels = await Hotel.find({
    "location.coordinates": {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
  });
  if (!hotels) throw new CustomError(status.NOT_FOUND, "No hotels found");
  return hotels;
};
exports.updateAmenities = async (id, amenities) => {
  if (
    !Array.isArray(amenities) ||
    !amenities.every((item) => typeof item === "string")
  ) {
    throw new CustomError(
      status.BAD_REQUEST,
      "Amenities must be an array of strings"
    );
  }
  const hotel = await Hotel.findById(id);
  if (!hotel) throw new CustomError(status.NOT_FOUND, "Hotel not found");
  hotel.amenities = amenities;
  await hotel.save();
  return hotel;
};
