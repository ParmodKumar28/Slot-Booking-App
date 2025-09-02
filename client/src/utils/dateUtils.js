import moment from "moment";

// Date validation utilities
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

// Date formatting utilities
export const formatDate = (date, format = "YYYY-MM-DD") => {
  return moment(date).format(format);
};

export const formatDisplayDate = (date) => {
  return moment(date).format("MMMM D, YYYY");
};

export const formatDisplayTime = (time) => {
  return moment(time, "HH:mm").format("h:mm A");
};

// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Slot generation
export const generateTimeSlots = () => {
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

// Date range utilities
export const getNextWeekDates = () => {
  const dates = [];
  const today = moment();

  for (let i = 0; i < 7; i++) {
    dates.push(today.clone().add(i, "days"));
  }

  return dates;
};

export const getNextMonthDates = () => {
  const dates = [];
  const today = moment();

  for (let i = 0; i < 30; i++) {
    dates.push(today.clone().add(i, "days"));
  }

  return dates;
};

// Booking utilities
export const createBookingId = (date, time) => {
  return `${date}_${time}_${Date.now()}`;
};

export const validateBookingData = ({ date, time, userEmail }) => {
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

  if (!isBusinessHours(time)) {
    errors.push("Slot must be between 9:00 AM and 5:00 PM");
  }

  return errors;
};
