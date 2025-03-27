const joi = require("joi");

exports.roomSchema = {
  body: joi.object().keys({
    hotel: joi.string().required(),
    name: joi.string().required().trim(),
    description: joi.string().required(),
    pricePerNight: joi.number().min(0).required(),
    maxGuests: joi.number().positive().min(1).required(),
    amenities: joi.array().items(joi.string()).required(),
    availability: joi.array().items(
      joi.object().keys({
        startDate: joi.date().required(),
        endDate: joi.date().required(),
      })
    ),
  }),
};
