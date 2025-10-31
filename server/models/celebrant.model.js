import mongoose from "mongoose";

const keyDateSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["Birthday", "Anniversary", "Wedding", "Naming Ceremony", "Holiday"],
  },
  date: {
    type: Date,
    required: true,
  },
  recurring: {
    type: Boolean,
    default: true,
  },
});

const celebrantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    photoUrl: {
      type: String,
    },
    relationship: {
      type: String,
      required: true,
    },
    favouriteTags: {
      type: [String],
    },
    keyDates: [keyDateSchema],
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Celebrant = mongoose.model("Celebrant", celebrantSchema);

export default Celebrant;
