const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const propertyRoutes = require("./routes/propertyRoutes");
const roomRoutes = require("./routes/roomRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/properties", propertyRoutes);
app.use("/rooms", roomRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3003, () => {
      console.log(
        `Property & Room Service running on port ${
          process.env.PORT || 3003
        }`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
