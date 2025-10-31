import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/User.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const createTestUser = async () => {
  try {
    await connectDB();
    console.log("Creating test user...");

    // Check if user already exists
    const existingUser = await User.findOne({ email: "admin@mail.com" });
    if (existingUser) {
      console.log("Test user already exists!");
      process.exit(0);
    }

    // Create test user with simple password
    const testUser = new User({
      firstName: "Admin",
      lastName: "User",
      email: "admin@mail.com",
      password: "password", // This will be hashed by the pre-save middleware
    });

    await testUser.save();
    console.log("✅ Test user created successfully!");
    console.log("📧 Email: admin@mail.com");
    console.log("🔑 Password: password");
    console.log("🚀 You can now login with these credentials");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating test user:", error);
    process.exit(1);
  }
};

createTestUser();
