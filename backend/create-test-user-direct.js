import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const createTestUserDirectly = async () => {
  try {
    await connectDB();
    console.log("Creating test user directly...");

    // Check if user already exists
    const existingUser = await User.findOne({ email: "admin@mail.com" });
    if (existingUser) {
      console.log("Deleting existing test user...");
      await User.deleteOne({ email: "admin@mail.com" });
    }

    // Hash the simple password manually
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash("password", salt);

    // Create test user directly in database
    const testUser = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@mail.com",
      password: hashedPassword,
      isActive: true,
    });

    console.log("✅ Test user created successfully!");
    console.log("📧 Email: admin@mail.com");
    console.log("🔑 Password: password");
    console.log("🆔 User ID:", testUser._id);
    console.log("🚀 You can now login with these credentials");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error creating test user:", error);
    process.exit(1);
  }
};

createTestUserDirectly();
