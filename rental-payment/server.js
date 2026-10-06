const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const rentalRoutes = require("./routes/rentalRoutes");
const paymentRoutes = require("./routes/paymentRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/rentals", rentalRoutes);
app.use("/payments", paymentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3004, () => {
      console.log(
        `Rental & Payment Service running on port ${
          process.env.PORT || 3004
        }`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
