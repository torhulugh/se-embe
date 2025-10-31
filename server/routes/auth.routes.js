import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

router.get("/register", (req, res) => {
  res.render("register");
});

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", protect, logoutUser);
router.get("/profile", protect, getCurrentUser);

export default router;
