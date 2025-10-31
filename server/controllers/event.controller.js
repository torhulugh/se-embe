import Event from "../models/event.model.js";

// @desc    Get all events for a user
// @route   GET /api/events
// @access  Private
const getEvents = async (req, res) => {
  const query = req.user.role === "admin" ? {} : { user: req.user._id };
  const events = await Event.find(query).populate("celebrant", "name");
  res.json({ message: "Events fetched successfully", events: events });
};

// @desc    Get a single event
// @route   GET /api/events/:id
// @access  Private
const getEventById = async (req, res) => {
  const event = await Event.findById(req.params.id).populate(
    "celebrant",
    "name"
  );

  if (
    event &&
    (event.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    res.json({ message: "Event fetched successfully", event: event });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

// @desc    Create an event
// @route   POST /api/events
// @access  Private
const createEvent = async (req, res) => {
  const { celebrant, title, date, reminderSettings, status } = req.body;

  const event = new Event({
    user: req.user._id,
    celebrant,
    title,
    date,
    reminderSettings,
    status,
  });

  const createdEvent = await event.save();
  res.status(201).json({ message: "Event created successfully", event: createdEvent });
};

// @desc    Update an event
// @route   PUT /api/events/:id
// @access  Private
const updateEvent = async (req, res) => {
  const { title, date, reminderSettings, status } = req.body;

  const event = await Event.findById(req.params.id);

  if (
    event &&
    (event.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    event.title = title || event.title;
    event.date = date || event.date;
    event.reminderSettings = reminderSettings || event.reminderSettings;
    event.status = status || event.status;

    const updatedEvent = await event.save();
    res.json({ message: "Event updated successfully", event: updatedEvent });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

// @desc    Delete an event
// @route   DELETE /api/events/:id
// @access  Private
const deleteEvent = async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (
    event &&
    (event.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    await event.deleteOne();
    res.json({ message: "Event deleted successfully" });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

export { getEvents, getEventById, createEvent, updateEvent, deleteEvent };
