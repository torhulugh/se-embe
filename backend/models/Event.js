import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    event: {
      type: String,
      required: [true, "Event type is required"],
      trim: true,
    },
    celebrant: {
      type: String,
      required: [true, "Celebrant name is required"],
      trim: true,
    },
    celebrantId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Celebrant",
      required: false, // Optional reference to celebrant document
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    message: {
      type: String,
      required: [true, "Event message is required"],
      trim: true,
    },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Index for better query performance
eventSchema.index({ date: 1, celebrant: 1 });
eventSchema.index({ event: 1 });

// Virtual for formatted date
eventSchema.virtual("formattedDate").get(function () {
  return new Date(this.date).toLocaleDateString();
});

// Ensure virtual fields are serialized
eventSchema.set("toJSON", { virtuals: true });

const Event = mongoose.model("Event", eventSchema);

export default Event;
