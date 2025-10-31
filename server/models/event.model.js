import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    celebrant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Celebrant",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    reminderSettings: {
      type: Object,
    },
    status: {
      type: String,
      enum: ["upcoming", "past", "cancelled"],
      default: "upcoming",
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
