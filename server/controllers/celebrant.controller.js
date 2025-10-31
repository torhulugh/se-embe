import Celebrant from "../models/celebrant.model.js";

// @desc    Get all celebrants for a user
// @route   GET /api/celebrants
// @access  Private
const getCelebrants = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { user: req.user._id };
  const celebrants = await Celebrant.find(query);
  res.json({
    message: "Celebrants fetched successfully",
    celebrants: celebrants,
  });
};

// @desc    Get a single celebrant
// @route   GET /api/celebrants/:id
// @access  Private
const getCelebrantById = async (req, res) => {
  const celebrant = await Celebrant.findById(req.params.id);

  if (
    celebrant &&
    (celebrant.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    res.json({
      message: "Celebrant fetched successfully",
      celebrant: celebrant,
    });
  } else {
    res.status(404).json({ message: "Celebrant not found" });
  }
};

// @desc    Create a celebrant
// @route   POST /api/celebrants
// @access  Private
const createCelebrant = async (req, res) => {
  const { name, photoUrl, relationship, favouriteTags, keyDates, notes } =
    req.body;

  const celebrant = new Celebrant({
    user: req.user._id,
    name,
    photoUrl,
    relationship,
    favouriteTags,
    keyDates,
    notes,
  });

  const createdCelebrant = await celebrant.save();
  res
    .status(201)
    .json({
      message: "Celebrant created successfully",
      celebrant: createdCelebrant,
    });
};

// @desc    Update a celebrant
// @route   PUT /api/celebrants/:id
// @access  Private
const updateCelebrant = async (req, res) => {
  const { name, photoUrl, relationship, favouriteTags, keyDates, notes } =
    req.body;

  const celebrant = await Celebrant.findById(req.params.id);

  if (
    celebrant &&
    (celebrant.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    celebrant.name = name || celebrant.name;
    celebrant.photoUrl = photoUrl || celebrant.photoUrl;
    celebrant.relationship = relationship || celebrant.relationship;
    celebrant.favouriteTags = favouriteTags || celebrant.favouriteTags;
    celebrant.keyDates = keyDates || celebrant.keyDates;
    celebrant.notes = notes || celebrant.notes;

    const updatedCelebrant = await celebrant.save();
    res.json({
      message: "Celebrant updated successfully",
      celebrant: updatedCelebrant,
    });
  } else {
    res.status(404).json({ message: "Celebrant not found" });
  }
};

// @desc    Delete a celebrant
// @route   DELETE /api/celebrants/:id
// @access  Private
const deleteCelebrant = async (req, res) => {
  const celebrant = await Celebrant.findById(req.params.id);

  if (
    celebrant &&
    (celebrant.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    await celebrant.deleteOne();
    res.json({ message: "Celebrant deleted successfully" });
  } else {
    res.status(404).json({ message: "Celebrant not found" });
  }
};

export {
  getCelebrants,
  getCelebrantById,
  createCelebrant,
  updateCelebrant,
  deleteCelebrant,
};
