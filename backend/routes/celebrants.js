import express from "express";
import Celebrant from "../models/Celebrant.js";
import Event from "../models/Event.js";
import { authenticateToken } from "../middleware/auth.js";

const router = express.Router();

// @route   GET /api/celebrants
// @desc    Get all celebrants for authenticated user
// @access  Private
router.get("/", authenticateToken, async (req, res) => {
  try {
    const { page = 1, limit = 10, name, relationship, ageGroup } = req.query;
    const query = { userId: req.user._id }; // Filter by user ID

    // Add filters if provided
    if (name) query.name = new RegExp(name, "i");
    if (relationship) query.relationship = relationship;
    if (ageGroup) query.ageGroup = ageGroup;

    const celebrants = await Celebrant.find(query)
      .sort({ name: 1, createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const total = await Celebrant.countDocuments(query);

    res.json({
      success: true,
      data: celebrants,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    console.error("Error fetching celebrants:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching celebrants",
      error: error.message,
    });
  }
});

// @route   GET /api/celebrants/:id
// @desc    Get single celebrant for authenticated user
// @access  Private
router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const celebrant = await Celebrant.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!celebrant) {
      return res.status(404).json({
        success: false,
        message: "Celebrant not found",
      });
    }

    // Get events for this celebrant
    const events = await Event.find({ celebrantId: req.params.id })
      .select("event date message status")
      .sort({ date: 1 });

    res.json({
      success: true,
      data: {
        ...celebrant.toJSON(),
        events: events,
        age: celebrant.getAge(),
      },
    });
  } catch (error) {
    console.error("Error fetching celebrant:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching celebrant",
      error: error.message,
    });
  }
});

// @route   POST /api/celebrants
// @desc    Create new celebrant for authenticated user
// @access  Private
router.post("/", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      relationship,
      ageGroup,
      likes,
      image,
      contactInfo,
      birthday,
      notes,
    } = req.body;

    // Validate required fields
    if (!name || !relationship || !ageGroup) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide all required fields: name, relationship, ageGroup",
      });
    }

    // Check if celebrant with same name already exists for this user
    const existingCelebrant = await Celebrant.findOne({
      name: name.trim(),
      userId: req.user._id,
    });

    if (existingCelebrant) {
      return res.status(400).json({
        success: false,
        message: "A celebrant with this name already exists",
      });
    }

    const newCelebrant = new Celebrant({
      userId: req.user._id, // Add user ID
      name: name.trim(),
      relationship,
      ageGroup,
      likes: likes || "",
      image: image || "/contact-p-p.png",
      contactInfo: contactInfo || {},
      birthday: birthday || null,
      notes: notes || "",
    });

    const savedCelebrant = await newCelebrant.save();

    res.status(201).json({
      success: true,
      data: savedCelebrant,
      message: "Celebrant created successfully",
    });
  } catch (error) {
    console.error("Error creating celebrant:", error);
    res.status(500).json({
      success: false,
      message: "Error creating celebrant",
      error: error.message,
    });
  }
});

// @route   PUT /api/celebrants/:id
// @desc    Update celebrant for authenticated user
// @access  Private
router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const {
      name,
      relationship,
      ageGroup,
      likes,
      image,
      contactInfo,
      birthday,
      notes,
    } = req.body;

    // If name is being updated, check for duplicates within user's celebrants
    if (name) {
      const existingCelebrant = await Celebrant.findOne({
        name: name.trim(),
        _id: { $ne: req.params.id },
        userId: req.user._id,
      });

      if (existingCelebrant) {
        return res.status(400).json({
          success: false,
          message: "A celebrant with this name already exists",
        });
      }
    }

    const updateData = {};
    if (name) updateData.name = name.trim();
    if (relationship) updateData.relationship = relationship;
    if (ageGroup) updateData.ageGroup = ageGroup;
    if (likes !== undefined) updateData.likes = likes;
    if (image) updateData.image = image;
    if (contactInfo) updateData.contactInfo = contactInfo;
    if (birthday !== undefined) updateData.birthday = birthday;
    if (notes !== undefined) updateData.notes = notes;

    const updatedCelebrant = await Celebrant.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id }, // Ensure user owns the celebrant
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedCelebrant) {
      return res.status(404).json({
        success: false,
        message: "Celebrant not found",
      });
    }

    res.json({
      success: true,
      data: updatedCelebrant,
      message: "Celebrant updated successfully",
    });
  } catch (error) {
    console.error("Error updating celebrant:", error);
    res.status(500).json({
      success: false,
      message: "Error updating celebrant",
      error: error.message,
    });
  }
});

// @route   DELETE /api/celebrants/:id
// @desc    Delete celebrant for authenticated user
// @access  Private
router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const celebrant = await Celebrant.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!celebrant) {
      return res.status(404).json({
        success: false,
        message: "Celebrant not found",
      });
    }

    // Check if celebrant has associated events for this user
    const eventCount = await Event.countDocuments({
      celebrantId: req.params.id,
      userId: req.user._id,
    });

    if (eventCount > 0) {
      return res.status(400).json({
        success: false,
        message: `Cannot delete celebrant. They have ${eventCount} associated event(s). Please delete or reassign the events first.`,
      });
    }

    await Celebrant.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id,
    });

    res.json({
      success: true,
      message: "Celebrant deleted successfully",
      data: celebrant,
    });
  } catch (error) {
    console.error("Error deleting celebrant:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting celebrant",
      error: error.message,
    });
  }
});

// @route   GET /api/celebrants/relationships/list
// @desc    Get list of all relationships
// @access  Public
router.get("/relationships/list", async (req, res) => {
  try {
    const relationships = [
      "Father",
      "Mother",
      "Brother",
      "Sister",
      "Uncle",
      "Aunt",
      "Grandfather",
      "Grandmother",
      "Cousin",
      "Friend",
      "Colleague",
      "Partner",
      "Spouse",
      "Son",
      "Daughter",
      "Other",
    ];

    res.json({
      success: true,
      data: relationships,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching relationships",
      error: error.message,
    });
  }
});

// @route   GET /api/celebrants/age-groups/list
// @desc    Get list of all age groups
// @access  Public
router.get("/age-groups/list", async (req, res) => {
  try {
    const ageGroups = ["Child", "Teen", "Young Adult", "Adult", "Senior"];

    res.json({
      success: true,
      data: ageGroups,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching age groups",
      error: error.message,
    });
  }
});

// @route   GET /api/celebrants/:id/events
// @desc    Get all events for a specific celebrant
// @access  Public
router.get("/:id/events", async (req, res) => {
  try {
    const celebrant = await Celebrant.findById(req.params.id);

    if (!celebrant) {
      return res.status(404).json({
        success: false,
        message: "Celebrant not found",
      });
    }

    const events = await Event.find({ celebrantId: req.params.id }).sort({
      date: 1,
    });

    res.json({
      success: true,
      data: {
        celebrant: celebrant,
        events: events,
      },
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
