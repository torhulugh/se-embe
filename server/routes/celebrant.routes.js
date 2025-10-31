import express from "express";
const router = express.Router();
import {
  getCelebrants,
  getCelebrantById,
  createCelebrant,
  updateCelebrant,
  deleteCelebrant,
} from "../controllers/celebrant.controller.js";
import { protect } from "../middleware/auth.middleware.js";

router.route("/").get(protect, getCelebrants).post(protect, createCelebrant);
router
  .route("/:id")
  .get(protect, getCelebrantById)
  .put(protect, updateCelebrant)
  .delete(protect, deleteCelebrant);

export default router;
