const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/register", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 3001, () => {
      console.log(
        `Registration Service running on port ${
          process.env.PORT || 3001
        }`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });
