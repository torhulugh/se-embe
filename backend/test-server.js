// Simple test server to verify basic functionality
import express from "express";
import cors from "cors";

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Simple test server is working!" });
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API endpoint test successful!" });
});

app
  .listen(PORT, "localhost", () => {
    console.log(`✅ Test server running on http://localhost:${PORT}`);
    console.log(`✅ Test endpoint: http://localhost:${PORT}/api/test`);
  })
  .on("error", (err) => {
    console.error("❌ Server error:", err);
  });

// Keep the process alive
process.on("SIGINT", () => {
  console.log("\n👋 Shutting down test server...");
  process.exit(0);
});
