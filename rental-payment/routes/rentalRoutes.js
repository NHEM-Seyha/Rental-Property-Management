const express = require("express");

const Rental = require("../models/Rental");

const router = express.Router();

// ==========================================
// CREATE RENTAL
// ==========================================
// Tenant ID comes from the verified JWT
// passed by the API Gateway.
// The tenant cannot choose another tenantId.

router.post("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];

    if (!userId || !userRole) {
      return res.status(401).json({
        message: "User authentication information is required"
      });
    }

    if (userRole !== "Tenant") {
      return res.status(403).json({
        message: "Only tenants can create rentals"
      });
    }

    const rental = new Rental({
      ...req.body,
      tenantId: userId
    });

    await rental.save();

    res.status(201).json({
      message: "Rental created successfully",
      rental
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create rental",
      error: error.message
    });
  }
});

// ==========================================
// GET ALL RENTALS
// ==========================================
// Manager → all rentals
// Tenant → only their own rentals

router.get("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];

    if (!userId || !userRole) {
      return res.status(401).json({
        message: "User authentication information is required"
      });
    }

    let rentals;

    if (userRole === "Manager") {
      rentals = await Rental.find();
    } else if (userRole === "Tenant") {
      rentals = await Rental.find({
        tenantId: userId
      });
    } else {
      return res.status(403).json({
        message: "Invalid user role"
      });
    }

    res.json(rentals);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get rentals",
      error: error.message
    });
  }
});

// ==========================================
// GET RENTAL BY ID
// ==========================================
// Manager → any rental
// Tenant → only their own rental

router.get("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];

    if (!userId || !userRole) {
      return res.status(401).json({
        message: "User authentication information is required"
      });
    }

    let rental;

    if (userRole === "Manager") {
      rental = await Rental.findById(req.params.id);
    } else if (userRole === "Tenant") {
      rental = await Rental.findOne({
        _id: req.params.id,
        tenantId: userId
      });
    } else {
      return res.status(403).json({
        message: "Invalid user role"
      });
    }

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found or access denied"
      });
    }

    res.json(rental);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get rental",
      error: error.message
    });
  }
});

// ==========================================
// UPDATE RENTAL
// ==========================================
// Manager only through API Gateway.

router.put("/:id", async (req, res) => {
  try {
    const rental = await Rental.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found"
      });
    }

    res.json({
      message: "Rental updated successfully",
      rental
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update rental",
      error: error.message
    });
  }
});

// ==========================================
// DELETE RENTAL
// ==========================================
// Manager only through API Gateway.

router.delete("/:id", async (req, res) => {
  try {
    const rental = await Rental.findByIdAndDelete(req.params.id);

    if (!rental) {
      return res.status(404).json({
        message: "Rental not found"
      });
    }

    res.json({
      message: "Rental deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete rental",
      error: error.message
    });
  }
});

module.exports = router;
