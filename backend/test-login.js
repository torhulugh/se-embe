import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const testLogin = async () => {
  try {
    await connectDB();
    console.log("Testing login credentials...");

    // Find the user
    const user = await User.findByEmailWithPassword("admin@mail.com");
    if (!user) {
      console.log("❌ User not found!");
      process.exit(1);
    }

    console.log("✅ User found:", user.email);
    console.log("🔍 User active:", user.isActive);
    console.log("🔑 Stored password hash:", user.password);

    // Test password comparison
    const testPassword = "password";
    const isMatch = await user.comparePassword(testPassword);
    console.log("🧪 Password comparison result:", isMatch);

    // Manual bcrypt comparison
    const manualCheck = await bcrypt.compare(testPassword, user.password);
    console.log("🔧 Manual bcrypt check:", manualCheck);

    if (isMatch) {
      console.log("✅ Login should work!");
    } else {
      console.log("❌ Login will fail!");
    }

    process.exit(0);
  } catch (error) {
    console.error("❌ Error testing login:", error);
    process.exit(1);
  }
};

testLogin();
