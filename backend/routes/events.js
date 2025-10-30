import express from "express";
import Event from "../models/Event.js";
import Celebrant from "../models/Celebrant.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/events
// @desc    Get all events for authenticated user
// @access  Private
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, date, celebrant, event } = req.query;
    const query = { userId: req.user._id }; // Filter by user ID

    // Add filters if provided
    if (date) query.date = date;
    if (celebrant) query.celebrant = new RegExp(celebrant, "i");
    if (event) query.event = new RegExp(event, "i");

    const events = await Event.find(query)
      .populate("celebrantId", "name image")
      .sort({ date: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Event.countDocuments(query);

    res.json({
      success: true,
      data: events,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching events",
      error: error.message,
    });
  }
});

// @route   GET /api/events/:id
// @desc    Get single event for authenticated user
// @access  Private
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const event = await Event.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate("celebrantId", "name image relationship");

    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      data: event,
    });
  } catch (error) {
    console.error("Error fetching event:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching event",
      error: error.message,
    });
  }
});

// @route   POST /api/events
// @desc    Create new event for authenticated user
// @access  Private
router.post("/", authenticateToken, async (req, res) => {
  try {
    const { event, celebrant, date, message, celebrantId } = req.body;

    // Validate required fields
    if (!event || !celebrant || !date || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: event, celebrant, date, message",
      });
    }

    // If celebrantId is provided, verify the celebrant exists and belongs to user
    if (celebrantId) {
      const celebrantExists = await Celebrant.findOne({
        _id: celebrantId,
        userId: req.user._id,
      });
      if (!celebrantExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid celebrant ID or celebrant does not belong to user",
        });
      }
    }

    const newEvent = new Event({
      userId: req.user._id, // Add user ID
      event,
      celebrant,
      date,
      message,
      celebrantId: celebrantId || null,
    });

    const savedEvent = await newEvent.save();
    await savedEvent.populate("celebrantId", "name image relationship");

    res.status(201).json({
      success: true,
      data: savedEvent,
      message: "Event created successfully",
    });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({
      success: false,
      message: "Error creating event",
      error: error.message,
    });
  }
});

// @route   PUT /api/events/:id
// @desc    Update event for authenticated user
// @access  Private
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const { event, celebrant, date, message, status, celebrantId } = req.body;

    // If celebrantId is provided, verify the celebrant exists and belongs to user
    if (celebrantId) {
      const celebrantExists = await Celebrant.findOne({
        _id: celebrantId,
        userId: req.user._id,
      });
      if (!celebrantExists) {
        return res.status(400).json({
          success: false,
          message: "Invalid celebrant ID or celebrant does not belong to user",
        });
      }
    }

    const updatedEvent = await Event.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // Ensure user owns the event
      {
        ...(event && { event }),
        ...(celebrant && { celebrant }),
        ...(date && { date }),
        ...(message && { message }),
        ...(status && { status }),
        ...(celebrantId !== undefined && { celebrantId }),
      },
      { new: true, runValidators: true }
    ).populate("celebrantId", "name image relationship");

    if (!updatedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      data: updatedEvent,
      message: "Event updated successfully",
    });
  } catch (error) {
    console.error("Error updating event:", error);
    res.status(500).json({
      success: false,
      message: "Error updating event",
      error: error.message,
    });
  }
});

// @route   DELETE /api/events/:id
// @desc    Delete event for authenticated user
// @access  Private
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const deletedEvent = await Event.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!deletedEvent) {
      return res.status(404).json({
        success: false,
        message: "Event not found",
      });
    }

    res.json({
      success: true,
      message: "Event deleted successfully",
      data: deletedEvent,
    });
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting event",
      error: error.message,
    });
  }
});

// @route   GET /api/events/celebrant/:celebrantId
// @desc    Get events for specific celebrant
// @access  Public
router.get("/celebrant/:celebrantId", async (req, res) => {
  try {
    const events = await Event.find({ celebrantId: req.params.celebrantId })
      .populate("celebrantId", "name image relationship")
      .sort({ date: 1 });

    res.json({
      success: true,
      data: events,
    });
  } catch (error) {
    console.error("Error fetching celebrant events:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching celebrant events",
      error: error.message,
    });
  }
});

export default router;
