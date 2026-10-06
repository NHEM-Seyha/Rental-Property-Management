const express = require("express");

const Payment = require("../models/Payment");

const router = express.Router();

// ==========================================
// CREATE PAYMENT
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
        message: "Only tenants can create payments"
      });
    }

    const payment = new Payment({
      ...req.body,
      tenantId: userId
    });

    await payment.save();

    res.status(201).json({
      message: "Payment created successfully",
      payment
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create payment",
      error: error.message
    });
  }
});

// ==========================================
// GET ALL PAYMENTS
// ==========================================
// Manager → all payments
// Tenant → only their own payments

router.get("/", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];

    if (!userId || !userRole) {
      return res.status(401).json({
        message: "User authentication information is required"
      });
    }

    let payments;

    if (userRole === "Manager") {
      payments = await Payment.find();
    } else if (userRole === "Tenant") {
      payments = await Payment.find({
        tenantId: userId
      });
    } else {
      return res.status(403).json({
        message: "Invalid user role"
      });
    }

    res.json(payments);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get payments",
      error: error.message
    });
  }
});

// ==========================================
// GET PAYMENT BY ID
// ==========================================
// Manager → any payment
// Tenant → only their own payment

router.get("/:id", async (req, res) => {
  try {
    const userId = req.headers["x-user-id"];
    const userRole = req.headers["x-user-role"];

    if (!userId || !userRole) {
      return res.status(401).json({
        message: "User authentication information is required"
      });
    }

    let payment;

    if (userRole === "Manager") {
      payment = await Payment.findById(req.params.id);
    } else if (userRole === "Tenant") {
      payment = await Payment.findOne({
        _id: req.params.id,
        tenantId: userId
      });
    } else {
      return res.status(403).json({
        message: "Invalid user role"
      });
    }

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found or access denied"
      });
    }

    res.json(payment);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get payment",
      error: error.message
    });
  }
});

// ==========================================
// UPDATE PAYMENT
// ==========================================
// Manager only through API Gateway.

router.put("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    res.json({
      message: "Payment updated successfully",
      payment
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update payment",
      error: error.message
    });
  }
});

// ==========================================
// DELETE PAYMENT
// ==========================================
// Manager only through API Gateway.

router.delete("/:id", async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found"
      });
    }

    res.json({
      message: "Payment deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete payment",
      error: error.message
    });
  }
});

module.exports = router;
