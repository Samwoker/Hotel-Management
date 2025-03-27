const joi = require("joi");

exports.hotelSchema = {
  body: joi.object().keys({
    name: joi.string().required().trim(),
    description: joi.string().optional(),
    location: joi
      .object()
      .keys({
        address: joi.string().required(),
        city: joi.string().required(),
        country: joi.string().required(),
        coordinates: joi
          .object()
          .keys({
            type: joi.string().valid("Point").required(),
            coordinates: joi.array().items(joi.number()).length(2).required(),
          })
          .required(),
      })
      .required(),
    starRating: joi.number().min(0).max(5).required(),
    amenities: joi.array().items(joi.string()).optional(),
    images: joi.array().items(joi.string()).optional(),
    contactInfo: joi
      .object()
      .keys({
        phone: joi.string().optional(),
        email: joi.string().email().optional(),
        website: joi.string().uri().optional(),
      })
      .required(),
  }),
};
