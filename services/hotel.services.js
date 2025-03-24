const Hotel = require("./../models/hotel.model");

exports.createHotel = async (req) => {
  const hotel = await Hotel.create(req.body);
  return hotel;
};
