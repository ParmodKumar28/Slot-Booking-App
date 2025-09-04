import moment from "moment";

// Validation functions
export const validateDateParam = (req, res, next) => {
  try {
    const { date } = req.params;

    if (!date) {
      return res.status(400).json({ error: "Date parameter is required" });
    }

    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    if (moment(date).isBefore(moment(), "day")) {
      return res
        .status(400)
        .json({ error: "Cannot fetch slots for past dates" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateEmailParam = (req, res, next) => {
  try {
    const { userEmail } = req.params;

    if (!userEmail) {
      return res
        .status(400)
        .json({ error: "User email parameter is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export const validateBookingRequest = (req, res, next) => {
  try {
    const { date, time, userEmail } = req.body;

    if (!date || !time || !userEmail) {
      return res
        .status(400)
        .json({ error: "Date, time, and user email are required" });
    }

    if (!moment(date, "YYYY-MM-DD", true).isValid()) {
      return res
        .status(400)
        .json({ error: "Invalid date format. Use YYYY-MM-DD" });
    }

    if (!moment(time, "HH:mm", true).isValid()) {
      return res.status(400).json({ error: "Invalid time format. Use HH:mm" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userEmail)) {
      return res
        .status(400)
        .json({ error: "Please enter a valid email address" });
    }

    if (moment(date).isBefore(moment(), "day")) {
      return res.status(400).json({ error: "Cannot book slots in the past" });
    }

    // If date is today, prevent booking earlier than current time
    if (moment(date).isSame(moment(), "day")) {
      const now = moment();
      const bookingTime = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
      if (bookingTime.isBefore(now)) {
        return res.status(400).json({ error: "Cannot book slots in the past" });
      }
    }

    // Check business hours (9:00 AM to 5:00 PM)
    const slotTime = moment(time, "HH:mm");
    const startTime = moment("09:00", "HH:mm");
    const endTime = moment("17:00", "HH:mm");

    if (!slotTime.isBetween(startTime, endTime, null, "[]")) {
      return res
        .status(400)
        .json({ error: "Slot must be between 9:00 AM and 5:00 PM" });
    }

    next();
  } catch (error) {
    next(error);
  }
};
