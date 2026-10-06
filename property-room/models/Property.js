const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    address: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true
    },

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },

    totalRooms: {
      type: Number,
      required: true,
      min: 1
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Property", propertySchema);
