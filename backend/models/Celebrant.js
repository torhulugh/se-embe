import mongoose from "mongoose";

const celebrantSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    name: {
      type: String,
      required: [true, "Celebrant name is required"],
      trim: true,
      minlength: [2, "Name must be at least 2 characters long"],
      maxlength: [50, "Name cannot exceed 50 characters"],
    },
    relationship: {
      type: String,
      required: [true, "Relationship is required"],
      enum: [
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
      ],
      trim: true,
    },
    ageGroup: {
      type: String,
      required: [true, "Age group is required"],
      enum: ["Child", "Teen", "Young Adult", "Adult", "Senior"],
      trim: true,
    },
    likes: {
      type: String,
      trim: true,
      maxlength: [500, "Likes description cannot exceed 500 characters"],
    },
    image: {
      type: String,
      default: "/contact-p-p.png",
      trim: true,
    },
    contactInfo: {
      email: {
        type: String,
        trim: true,
        lowercase: true,
        match: [
          /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
          "Please enter a valid email",
        ],
      },
      phone: {
        type: String,
        trim: true,
      },
    },
    birthday: {
      type: Date,
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [1000, "Notes cannot exceed 1000 characters"],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Index for better query performance
celebrantSchema.index({ name: 1 });
celebrantSchema.index({ relationship: 1 });
celebrantSchema.index({ ageGroup: 1 });

// Virtual for upcoming birthday
celebrantSchema.virtual("upcomingBirthday").get(function () {
  if (!this.birthday) return null;

  const today = new Date();
  const birthday = new Date(this.birthday);
  const thisYear = today.getFullYear();

  // Set birthday to this year
  const thisYearBirthday = new Date(
    thisYear,
    birthday.getMonth(),
    birthday.getDate()
  );

  // If birthday has passed this year, calculate for next year
  if (thisYearBirthday < today) {
    thisYearBirthday.setFullYear(thisYear + 1);
  }

  return thisYearBirthday;
});

// Method to get age
celebrantSchema.methods.getAge = function () {
  if (!this.birthday) return null;

  const today = new Date();
  const birthday = new Date(this.birthday);
  let age = today.getFullYear() - birthday.getFullYear();
  const monthDiff = today.getMonth() - birthday.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthday.getDate())
  ) {
    age--;
  }

  return age;
};

// Ensure virtual fields are serialized
celebrantSchema.set("toJSON", { virtuals: true });

const Celebrant = mongoose.model("Celebrant", celebrantSchema);

export default Celebrant;
