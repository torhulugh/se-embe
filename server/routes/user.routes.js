import express from "express";
const router = express.Router();
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  updateCurrentUser,
} from "../controllers/user.controller.js";
import { protect, isAdmin } from "../middleware/auth.middleware.js";

router
  .route("/")
  .get(protect, isAdmin, getUsers)
  .post(protect, isAdmin, createUser);

router.route("/me").put(protect, updateCurrentUser);

router
  .route("/:id")
  .get(protect, isAdmin, getUserById)
  .put(protect, isAdmin, updateUser)
  .delete(protect, isAdmin, deleteUser);

export default router;
