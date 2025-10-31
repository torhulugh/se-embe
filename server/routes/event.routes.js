import express from "express";
const router = express.Router();
import {
  getEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controller.js";
import { protect } from "../middleware/auth.middleware.js";

router.route("/").get(protect, getEvents).post(protect, createEvent);
router
  .route("/:id")
  .get(protect, getEventById)
  .put(protect, updateEvent)
  .delete(protect, deleteEvent);

export default router;
