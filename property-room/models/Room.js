const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    roomNumber: {
      type: String,
      required: true,
      trim: true
    },

    type: {
      type: String,
      enum: ["Single", "Double", "Suite"],
      required: true
    },

    monthlyRent: {
      type: Number,
      required: true,
      min: 0
    },

    status: {
      type: String,
      enum: ["Available", "Occupied", "Maintenance"],
      default: "Available"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Room", roomSchema);
