import Message from "../models/message.model.js";
import Event from "../models/event.model.js";

// @desc    Get messages for an event
// @route   GET /api/messages/event/:eventId
// @access  Private
const getMessagesByEvent = async (req, res) => {
  const event = await Event.findById(req.params.eventId);

  if (
    event &&
    (event.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    const messages = await Message.find({ event: req.params.eventId });
    res.json({ message: "Messages fetched successfully", messages: messages });
  } else {
    res.status(404).json({ message: "Event not found" });
  }
};

// @desc    Create a message for an event
// @route   POST /api/messages/event/:eventId
// @access  Private
const createMessage = async (req, res) => {
  const { content } = req.body;
  const event = await Event.findById(req.params.eventId);

  if (
    event &&
    (event.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    const message = new Message({
      user: req.user._id,
      event: req.params.eventId,
      content,
    });

    const createdMessage = await message.save();
    res.status(201).json({ message: "Message created successfully", message: createdMessage });
  } else {
    res.status(404).json({ message: "Event not found" })    ;
  }
};

// @desc    Update a message
// @route   PUT /api/messages/:id
// @access  Private
const updateMessage = async (req, res) => {
  const { content } = req.body;
  const message = await Message.findById(req.params.id);

  if (
    message &&
    (message.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    message.content = content || message.content;
    const updatedMessage = await message.save();
    res.json({ message: "Message updated successfully", message: updatedMessage });
  } else {
    res.status(404).json({ message: "Message not found" });
  }
};

// @desc    Delete a message
// @route   DELETE /api/messages/:id
// @access  Private
const deleteMessage = async (req, res) => {
  const message = await Message.findById(req.params.id);

  if (
    message &&
    (message.user.toString() === req.user._id.toString() ||
      req.user.role === "admin")
  ) {
    await message.deleteOne();
    res.json({ message: "Message deleted successfully" });
  } else {
    res.status(404).json({ message: "Message not found" });
  }
};

export { getMessagesByEvent, createMessage, updateMessage, deleteMessage };
