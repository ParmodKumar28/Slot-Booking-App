import express from "express";
import {
  bookSlot,
  getUserBookingsController,
} from "../controllers/bookingController.js";
import {
  validateBookingRequest,
  validateEmailParam,
} from "../middleware/validation.js";

const router = express.Router();

// Book a slot
router.post("/", validateBookingRequest, bookSlot);

// Get user's bookings
router.get("/:userEmail", validateEmailParam, getUserBookingsController);

export default router;
