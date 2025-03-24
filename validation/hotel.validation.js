const joi = require("joi");

const hotelSchema = {
  body: joi.object().keys({
    name: joi.string().required().trim(),
    description: joi.string(),
    location: joi
      .object()
      .keys({
        address: joi.string().required(),
        city: joi.string().required(),
        country: joi.string().required(),
        coordinates: joi.object().keys({
          lat: joi.number(),
          lng: joi.number(),
        }),
      })
      .required(),
  }),
  starRating: joi.number().min(0).max(5).required(),
  amenities: joi.array().items(joi.string()),
  images: joi.array().items(joi.string()),
  contactInfo: joi
    .object()
    .keys({
      phone: joi.string(),
      email: joi.string(),
      website: joi.string(),
    })
    .required(),
  createdAt: joi.date().default(Date.now),
};

module.exports = hotelSchema;
