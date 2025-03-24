const mongoose = require("mongoose");

const hotelSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    location: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
      coordinates: {
        lat: Number,
        lng: Number,
      },
    },
    starRating: {
      type: Number,
      min: 0,
      max: 5,
      required: true,
    },
    amenities: [{ type: String }],
    images: [{ type: String }],
    contactInfo: {
      phone: {
        type: String,
      },
      email: {
        type: String,
      },
      website: {
        type: String,
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamp: true }
);

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
