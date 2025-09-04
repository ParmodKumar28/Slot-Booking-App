import { db } from "../config/database.js";
import {
  generateTimeSlots,
  processSlotAvailability,
} from "./timeSlotService.js";

export const getSlotsForDate = async (date) => {
  try {
    // Get all time slots
    const allSlots = generateTimeSlots();

    // Get booked slots from Firestore
    const bookingsRef = db.collection("bookings");
    const snapshot = await bookingsRef.where("date", "==", date).get();

    const bookedSlots = [];
    snapshot.forEach((doc) => {
      bookedSlots.push(doc.data().time);
    });

    // Process slot availability
    const availableSlots = processSlotAvailability(allSlots, bookedSlots, date);

    return { slots: availableSlots, date };
  } catch (error) {
    throw new Error(`Failed to fetch slots: ${error.message}`);
  }
};
