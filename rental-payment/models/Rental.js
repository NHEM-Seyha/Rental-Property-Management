const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema(
  {
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    propertyId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    startDate: {
      type: Date,
      required: true
    },
    endDate: {
      type: Date,
      required: true
    },
    monthlyRent: {
      type: Number,
      required: true,
      min: 0
    },
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Rental", rentalSchema);
