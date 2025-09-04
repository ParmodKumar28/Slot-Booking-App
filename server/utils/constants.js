// Business hours configuration
export const BUSINESS_HOURS = {
  START: "09:00",
  END: "17:00",
  SLOT_INTERVAL: 30, // minutes
};

// API configuration
export const API_CONFIG = {
  VERSION: "1.0.0",
  NAME: "Slot Booking API",
};

// Validation messages
export const VALIDATION_MESSAGES = {
  DATE_REQUIRED: "Date parameter is required",
  TIME_REQUIRED: "Time parameter is required",
  EMAIL_REQUIRED: "User email is required",
  INVALID_DATE_FORMAT: "Invalid date format. Use YYYY-MM-DD",
  INVALID_TIME_FORMAT: "Invalid time format. Use HH:mm",
  INVALID_EMAIL: "Please enter a valid email address",
  PAST_DATE: "Cannot book slots in the past",
  PAST_TIME: "Cannot book slots in the past",
  OUTSIDE_BUSINESS_HOURS: "Slot must be between 9:00 AM and 5:00 PM",
  SLOT_ALREADY_BOOKED: "Slot is already booked",
  USER_ALREADY_BOOKED: "You already booked a slot for this date",
};
