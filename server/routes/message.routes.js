import express from "express";
const router = express.Router();
import {
  getMessagesByEvent,
  createMessage,
  updateMessage,
  deleteMessage,
} from "../controllers/message.controller.js";
import { protect } from "../middleware/auth.middleware.js";

router
  .route("/event/:eventId")
  .get(protect, getMessagesByEvent)
  .post(protect, createMessage);

router.route("/:id").put(protect, updateMessage).delete(protect, deleteMessage);

export default router;
