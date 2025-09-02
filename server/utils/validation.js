import moment from "moment";

// Validation utilities
export const isValidDate = (date) => {
  return moment(date, "YYYY-MM-DD", true).isValid();
};

export const isValidTime = (time) => {
  return moment(time, "HH:mm", true).isValid();
};

export const isPastDate = (date) => {
  return moment(date).isBefore(moment(), "day");
};

export const isBusinessHours = (time) => {
  const slotTime = moment(time, "HH:mm");
  const startTime = moment("09:00", "HH:mm");
  const endTime = moment("17:00", "HH:mm");

  return slotTime.isBetween(startTime, endTime, null, "[]");
};

export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Determine if a given (date,time) is in the past relative to now
export const isPastDateTime = (date, time) => {
  if (!isValidDate(date) || !isValidTime(time)) return false;
  const now = moment();
  const candidate = moment(`${date} ${time}`, "YYYY-MM-DD HH:mm");
  return candidate.isBefore(now);
};

// Validation functions
export const validateBookingRequest = ({ date, time, userEmail }) => {
  const errors = [];

  if (!date || !time || !userEmail) {
    errors.push("Date, time, and user email are required");
  }

  if (!isValidDate(date)) {
    errors.push("Invalid date format. Use YYYY-MM-DD");
  }

  if (!isValidTime(time)) {
    errors.push("Invalid time format. Use HH:mm");
  }

  if (!isValidEmail(userEmail)) {
    errors.push("Please enter a valid email address");
  }

  if (isPastDate(date)) {
    errors.push("Cannot book slots in the past");
  }

  // If date is today, prevent booking earlier than current time
  if (moment(date).isSame(moment(), "day") && isPastDateTime(date, time)) {
    errors.push("Cannot book slots in the past");
  }

  if (!isBusinessHours(time)) {
    errors.push("Slot must be between 9:00 AM and 5:00 PM");
  }

  return errors;
};

export const validateDateParam = (date) => {
  if (!isValidDate(date)) {
    throw new Error("Invalid date format. Use YYYY-MM-DD");
  }

  if (isPastDate(date)) {
    throw new Error("Cannot fetch slots for past dates");
  }

  return true;
};

export const validateEmailParam = (email) => {
  if (!email) {
    throw new Error("Email parameter is required");
  }

  if (!isValidEmail(email)) {
    throw new Error("Invalid email format");
  }

  return true;
};
