const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3002, () => {
      console.log(
        `Login Service running on port ${
          process.env.PORT || 3002
        }`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
