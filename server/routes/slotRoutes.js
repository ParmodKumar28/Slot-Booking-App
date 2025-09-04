import express from "express";
import { getSlots } from "../controllers/slotController.js";
import { validateDateParam } from "../middleware/validation.js";

const router = express.Router();

// Get available slots for a given date
router.get("/:date", validateDateParam, getSlots);

export default router;
