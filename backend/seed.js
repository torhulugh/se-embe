import mongoose from "mongoose";
import dotenv from "dotenv";
import Event from "./models/Event.js";
import Celebrant from "./models/Celebrant.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Event.deleteMany({});
    await Celebrant.deleteMany({});
    console.log("Cleared existing data...");

    // Seed celebrants
    const celebrants = [
      {
        name: "John Don",
        relationship: "Father",
        ageGroup: "Adult",
        likes: "Reading, gardening, and cooking",
        image: "/contact-p-p.png",
      },
      {
        name: "Jane Smith",
        relationship: "Mother",
        ageGroup: "Adult",
        likes: "Music, traveling, and painting",
        image: "/contact-p-p.png",
      },
      {
        name: "Bob Johnson",
        relationship: "Brother",
        ageGroup: "Young Adult",
        likes: "Sports, gaming, and movies",
        image: "/contact-p-p.png",
      },
      {
        name: "Alice Williams",
        relationship: "Sister",
        ageGroup: "Teen",
        likes: "Dancing, social media, and fashion",
        image: "/contact-p-p.png",
      },
      {
        name: "Mike Davis",
        relationship: "Uncle",
        ageGroup: "Adult",
        likes: "Fishing, woodworking, and BBQ",
        image: "/contact-p-p.png",
      },
      {
        name: "Sarah Brown",
        relationship: "Friend",
        ageGroup: "Young Adult",
        likes: "Photography, hiking, and coffee",
        image: "/contact-p-p.png",
      },
    ];

    const createdCelebrants = await Celebrant.insertMany(celebrants);
    console.log("Seeded celebrants...");

    // Seed events
    const events = [
      {
        event: "Birthday",
        celebrant: "John Don",
        celebrantId: createdCelebrants[0]._id,
        date: "2025-01-15",
        message:
          "Happy Birthday to the one who fills my life with meaning. May this year bring you the same joy, warmth, and love you have given me every single day.",
      },
      {
        event: "Birthday",
        celebrant: "Jane Smith",
        celebrantId: createdCelebrants[1]._id,
        date: "2025-02-20",
        message:
          "Happy Birthday to an amazing mother! Your love and wisdom guide us every day.",
      },
      {
        event: "Wedding Anniversary",
        celebrant: "Bob Johnson",
        celebrantId: createdCelebrants[2]._id,
        date: "2025-03-10",
        message:
          "Congratulations on your special day! Wishing you both a lifetime of happiness together.",
      },
      {
        event: "Graduation",
        celebrant: "Alice Williams",
        celebrantId: createdCelebrants[3]._id,
        date: "2025-05-15",
        message:
          "Congratulations on your graduation! Your hard work and dedication have paid off.",
      },
    ];

    await Event.insertMany(events);
    console.log("Seeded events...");

    console.log("Seeding completed successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
