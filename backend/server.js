import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/database.js";

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration for production deployment
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "https://abc6b38d.se-embe.pages.dev",
    "https://se-embe.pages.dev",
    "https://*.pages.dev", // Allow all Cloudflare Pages subdomains
    // Add your custom domain here when you have one
    // 'https://your-custom-domain.com'
  ],
  credentials: true,
  optionsSuccessStatus: 200, // For legacy browser support
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB
connectDB();

// Routes
import authRoutes from "./routes/auth.js";
import eventRoutes from "./routes/events.js";
import celebrantRoutes from "./routes/celebrants.js";

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/celebrants", celebrantRoutes);

// Basic route
app.get("/", (req, res) => {
  res.json({ message: "SE-EMBE Backend API is running!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ message: "Something went wrong!", error: err.message });
});

// Start server
app
  .listen(PORT, "localhost", () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`Test the API at: http://localhost:${PORT}/`);
  })
  .on("error", (err) => {
    console.error("Server startup error:", err);
    if (err.code === "EADDRINUSE") {
      console.error(
        `Port ${PORT} is already in use. Please stop other services or change the port.`
      );
    }
  });

export default app;
