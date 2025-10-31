import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const createTestUserCorrect = async () => {
  try {
    await connectDB();
    console.log("Creating test user correctly...");

    // Delete existing user
    await User.deleteOne({ email: "admin@mail.com" });
    console.log("Deleted existing user if any...");

    // Create user using the model (this will trigger pre-save middleware)
    const testUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@mail.com",
      password: "password", // This will be hashed by the pre-save middleware
      isActive: true,
    });

    await testUser.save();

    console.log("✅ Test user created successfully!");
    console.log("📧 Email: admin@mail.com");
    console.log("🔑 Password: password");
    console.log("🆔 User ID:", testUser._id);

    // Test the password immediately
    const isValid = await testUser.comparePassword("password");
    console.log("🧪 Password test result:", isValid);

    if (isValid) {
      console.log("🚀 Login should work now!");
    } else {
      console.log("❌ Something is still wrong!");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating test user:", error);
    process.exit(1);
  }
};

createTestUserCorrect();
