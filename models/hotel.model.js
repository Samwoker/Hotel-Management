const { required } = require("joi");
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
        type: { type: String, enum: ["Point"], required: true },
        coordinates: {
          type: [Number],
          required: true,
        },
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

hotelSchema.index({"location.coordinates": "2dsphere"});

const Hotel = mongoose.model("Hotel", hotelSchema);
module.exports = Hotel;
