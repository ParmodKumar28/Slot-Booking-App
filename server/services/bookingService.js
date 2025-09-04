import { db, admin } from "../config/database.js";
import moment from "moment";

export const createBooking = async (bookingData) => {
  try {
    const { date, time, userEmail } = bookingData;

    // Check if slot is already booked
    const bookingsRef = db.collection("bookings");
    const existingBooking = await bookingsRef
      .where("date", "==", date)
      .where("time", "==", time)
      .get();

    if (!existingBooking.empty) {
      throw new Error("Slot is already booked");
    }

    // One booking per user per date
    const userExistingForDate = await bookingsRef
      .where("userEmail", "==", userEmail)
      .where("date", "==", date)
      .limit(1)
      .get();

    if (!userExistingForDate.empty) {
      throw new Error("You already booked a slot for this date");
    }

    // Create booking
    const booking = {
      date,
      time,
      userEmail,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      bookingId: `${date}_${time}_${Date.now()}`,
    };

    const docRef = await bookingsRef.add(booking);

    return {
      id: docRef.id,
      ...booking,
      displayTime: moment(time, "HH:mm").format("h:mm A"),
    };
  } catch (error) {
    throw new Error(`Failed to create booking: ${error.message}`);
  }
};

export const getUserBookings = async (userEmail) => {
  try {
    const bookingsRef = db.collection("bookings");
    const snapshot = await bookingsRef
      .where("userEmail", "==", userEmail)
      .get();

    const bookings = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      bookings.push({
        id: doc.id,
        ...data,
        displayTime: moment(data.time, "HH:mm").format("h:mm A"),
        displayDate: moment(data.date).format("MMMM D, YYYY"),
      });
    });

    // Sort in memory: date desc, then time asc
    bookings.sort((a, b) => {
      if (a.date === b.date) {
        return a.time.localeCompare(b.time);
      }
      return b.date.localeCompare(a.date);
    });

    return { bookings };
  } catch (error) {
    throw new Error(`Failed to fetch user bookings: ${error.message}`);
  }
};
