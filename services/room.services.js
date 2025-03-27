const Room = require("./../models/room.model");
const Hotel = require("./../models/hotel.model");
const CustomError = require("./../utils/customError");
const { status } = require("http-status");

exports.createRoom = async (body) => {
  const { hotel } = body;
  const existingHotel = await Hotel.findById(hotel);
  if (!existingHotel)
    throw new CustomError(status.NOT_FOUND, "Hotel not found");
  const room = await Room.create(body);
  return room;
};
