import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import celebrantRoutes from "./routes/celebrant.routes.js";
import eventRoutes from "./routes/event.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";

dotenv.config();

connectDB();

const app = express();

const __dirname = path.resolve();
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

const defaultOrigins = [
  "http://localhost:8080",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  "https://seembe.vercel.app",
  "https://seembe.pages.dev",
  "https://*.pages.dev",
];

const allowedOrigins = (
  process.env.CLIENT_ORIGIN
    ? process.env.CLIENT_ORIGIN.split(",")
    : defaultOrigins
).map((origin) => origin.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      // Check for Cloudflare Pages wildcard domains
      if (origin && origin.endsWith(".pages.dev")) {
        return callback(null, true);
      }

      console.warn(`Blocked CORS request from origin: ${origin}`);
      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.get("/", (req, res) => {
  res.redirect("/api/auth/login");
});

app.use("/api/auth", authRoutes);
app.use("/api/celebrants", celebrantRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
