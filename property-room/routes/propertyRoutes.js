const express = require("express");
const Property = require("../models/Property");

const router = express.Router();

// Create property
router.post("/", async (req, res) => {
  try {
    const property = new Property(req.body);

    await property.save();

    res.status(201).json({
      message: "Property created successfully",
      property
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create property",
      error: error.message
    });
  }
});

// Get all properties
router.get("/", async (req, res) => {
  try {
    const properties = await Property.find();

    res.json(properties);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get properties",
      error: error.message
    });
  }
});

// Get property by ID
router.get("/:id", async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.json(property);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get property",
      error: error.message
    });
  }
});

// Update property
router.put("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.json({
      message: "Property updated successfully",
      property
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update property",
      error: error.message
    });
  }
});

// Delete property
router.delete("/:id", async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found"
      });
    }

    res.json({
      message: "Property deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete property",
      error: error.message
    });
  }
});

module.exports = router;
