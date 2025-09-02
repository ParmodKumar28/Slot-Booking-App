import express from "express";
import cors from "cors";
import admin from "firebase-admin";
import moment from "moment";
import dotenv from "dotenv";
import {
  validateBookingRequest,
  validateDateParam,
  validateEmailParam,
} from "./utils/validation.js";
import firebaseServiceAccount from "./config/firebase.js";

// Module setup
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// Loading environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
// const serviceAccountPath = join(
//   __dirname,
//   "config/firebase-service-account.json"
// );
// const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
admin.initializeApp({
  credential: admin.credential.cert(firebaseServiceAccount),
});

const db = admin.firestore();

// Generate time slots from 9:00 AM to 5:00 PM (30-minute intervals)
const generateTimeSlots = () => {
  const slots = [];
  const startTime = moment("09:00", "HH:mm");
  const endTime = moment("17:00", "HH:mm");

  let currentTime = startTime.clone();

  while (currentTime.isBefore(endTime)) {
    slots.push({
      time: currentTime.format("HH:mm"),
      displayTime: currentTime.format("h:mm A"),
      available: true,
    });
    currentTime.add(30, "minutes");
  }

  return slots;
};

// Error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  res.status(500).json({ error: "Internal server error" });
};

// API Routes

// Get available slots for a given date
app.get("/api/slots/:date", async (req, res, next) => {
  try {
    const { date } = req.params;
    console.log("Fetching slots for date:", date);
    // Validate date parameter
    validateDateParam(date);

    // Get all time slots
    const allSlots = generateTimeSlots();

    // Get booked slots from Firestore
    const bookingsRef = db.collection("bookings");
    const snapshot = await bookingsRef.where("date", "==", date).get();

    const bookedSlots = [];
    snapshot.forEach((doc) => {
      bookedSlots.push(doc.data().time);
    });

    // Mark booked slots as unavailable
    const now = moment();
    const isToday = moment(date, "YYYY-MM-DD").isSame(now, "day");
    const currentTime = now.format("HH:mm");
    const availableSlots = allSlots.map((slot) => {
      const isBooked = bookedSlots.includes(slot.time);
      const isPast = isToday ? slot.time < currentTime : false;
      return {
        ...slot,
        isBooked,
        isPast,
        available: !isBooked && !isPast,
      };
    });

    res.json({ slots: availableSlots, date });
  } catch (error) {
    next(error);
  }
});

// Book a slot
app.post("/api/book", async (req, res, next) => {
  try {
    const { date, time, userEmail } = req.body;

    // Validate booking request
    const validationErrors = validateBookingRequest({ date, time, userEmail });
    if (validationErrors.length > 0) {
      return res.status(400).json({ error: validationErrors[0] });
    }

    // Check if slot is already booked
    const bookingsRef = db.collection("bookings");
    const existingBooking = await bookingsRef
      .where("date", "==", date)
      .where("time", "==", time)
      .get();

    if (!existingBooking.empty) {
      return res.status(409).json({ error: "Slot is already booked" });
    }

    // One booking per user per date
    const userExistingForDate = await bookingsRef
      .where("userEmail", "==", userEmail)
      .where("date", "==", date)
      .limit(1)
      .get();

    if (!userExistingForDate.empty) {
      return res.status(409).json({ error: "You already booked a slot" });
    }

    // Create booking
    const booking = {
      date,
      time,
      userEmail,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      bookingId: `${date}_${time}_${Date.now()}`,
    };

    await bookingsRef.add(booking);

    res.status(201).json({
      message: "Slot booked successfully",
      booking: {
        date,
        time,
        displayTime: moment(time, "HH:mm").format("h:mm A"),
        userEmail,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Get user's bookings
app.get("/api/bookings/:userEmail", async (req, res, next) => {
  try {
    const { userEmail } = req.params;

    // Validate email parameter
    validateEmailParam(userEmail);

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
        // times are in HH:mm 24h format, safe lexical compare
        return a.time.localeCompare(b.time);
      }
      // dates are in YYYY-MM-DD, safe lexical compare (desc)
      return b.date.localeCompare(a.date);
    });

    res.json({ bookings });
  } catch (error) {
    next(error);
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "Slot booking API is running",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
  });
});

// Error handling middleware
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📅 Slot Booking API ready at http://localhost:${PORT}`);
});
