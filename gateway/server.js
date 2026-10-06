const express = require("express");
const cors = require("cors");
require("dotenv").config();

const gatewayRoutes = require("./routes/gatewayRoutes");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.json({
    message: "Rental Property Management API Gateway is running"
  });
});

app.use("/", gatewayRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`API Gateway running on port ${PORT}`);
});
