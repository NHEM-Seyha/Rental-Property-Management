const express = require("express");
const Room = require("../models/Room");

const router = express.Router();

// Create room
router.post("/", async (req, res) => {
  try {
    const room = new Room(req.body);

    await room.save();

    res.status(201).json({
      message: "Room created successfully",
      room
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to create room",
      error: error.message
    });
  }
});

// Get all rooms
router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();

    res.json(rooms);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get rooms",
      error: error.message
    });
  }
});

// Get room by ID
router.get("/:id", async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    res.json(room);
  } catch (error) {
    res.status(500).json({
      message: "Failed to get room",
      error: error.message
    });
  }
});

// Update room
router.put("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true
      }
    );

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    res.json({
      message: "Room updated successfully",
      room
    });
  } catch (error) {
    res.status(400).json({
      message: "Failed to update room",
      error: error.message
    });
  }
});

// Delete room
router.delete("/:id", async (req, res) => {
  try {
    const room = await Room.findByIdAndDelete(req.params.id);

    if (!room) {
      return res.status(404).json({
        message: "Room not found"
      });
    }

    res.json({
      message: "Room deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete room",
      error: error.message
    });
  }
});

module.exports = router;
