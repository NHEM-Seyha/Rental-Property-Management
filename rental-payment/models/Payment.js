const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    rentalId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    tenantId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    paymentDate: {
      type: Date,
      required: true
    },
    method: {
      type: String,
      enum: ["Cash", "Bank Transfer", "Credit Card", "ABA Pay"],
      required: true
    },
    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending"
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Payment", paymentSchema);
